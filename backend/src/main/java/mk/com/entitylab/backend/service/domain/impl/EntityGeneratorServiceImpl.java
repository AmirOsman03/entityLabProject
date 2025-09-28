package mk.com.entitylab.backend.service.domain.impl;

import mk.com.entitylab.backend.model.domain.EntityRequest;
import mk.com.entitylab.backend.model.domain.FieldRequest;
import mk.com.entitylab.backend.model.domain.RelationRequest;
import mk.com.entitylab.backend.service.domain.EntityGeneratorService;
import org.springframework.stereotype.Service;

@Service
public class EntityGeneratorServiceImpl implements EntityGeneratorService {

    @Override
    public String generateEntity(EntityRequest request) {
        StringBuilder sb = new StringBuilder();

        boolean needsListImport = request.getRelations() != null && request.getRelations().stream()
                .anyMatch(r -> "OneToMany".equals(r.getType()) || "ManyToMany".equals(r.getType()));

        boolean needsLocalDateImport = false;
        boolean needsLocalDateTimeImport = false;
        boolean needsCreationUpdateTimestamp = false;

        // Check the fields for imports
        if (request.getFields() != null) {
            for (FieldRequest field : request.getFields()) {
                if (field.getType() != null) {
                    switch (field.getType()) {
                        case "LocalDate":
                            needsLocalDateImport = true;
                            break;
                        case "LocalDateTime":
                            needsLocalDateTimeImport = true;
                            break;
                    }

                    if ((field.getName().equals("createdAt") || field.getName().equals("updatedAt"))
                            && (field.getType().equals("LocalDate") || field.getType().equals("LocalDateTime"))) {
                        needsCreationUpdateTimestamp = true;
                    }
                }
            }
        }

        // Imports
        sb.append("import jakarta.persistence.*;\n");
        if (needsListImport) sb.append("import java.util.List;\n");
        sb.append("import lombok.Data;\n");
        sb.append("import lombok.NoArgsConstructor;\n");
        if (needsLocalDateImport) sb.append("import java.time.LocalDate;\n");
        if (needsLocalDateTimeImport) sb.append("import java.time.LocalDateTime;\n");
        if (needsCreationUpdateTimestamp) {
            sb.append("import org.hibernate.annotations.CreationTimestamp;\n");
            sb.append("import org.hibernate.annotations.UpdateTimestamp;\n");
        }
        sb.append("\n");

        // Class declaration
        sb.append("@Entity\n@Data\n@NoArgsConstructor\n");
        sb.append("public class ").append(request.getName()).append(" {\n\n");

        // ID field
        if (request.getIdName() != null && !request.getIdName().isBlank() &&
                request.getIdType() != null && !request.getIdType().isBlank()) {

            if (request.getIdName().equals("username") && request.getIdType().equals("String")) {
                sb.append("    @Id\n");
                sb.append("    private ").append(request.getIdType()).append(" ").append(request.getIdName()).append(";\n\n");
            } else {
                sb.append("    @Id\n");
                sb.append("    @GeneratedValue(strategy = GenerationType.IDENTITY)\n");
                sb.append("    private ").append(request.getIdType()).append(" ").append(request.getIdName()).append(";\n\n");
            }
        }

        // Fields
        if (request.getFields() != null) {
            for (FieldRequest field : request.getFields()) {
                if (field.getName() == null || field.getName().isBlank() ||
                        field.getType() == null || field.getType().isBlank()) continue;

                // Timestamps
                if ((field.getName().equals("createdAt") || field.getName().equals("updatedAt"))) {
                    if ("LocalDateTime".equals(field.getType()) || "LocalDate".equals(field.getType())) {
                        sb.append("\n    ").append(field.getName().equals("createdAt") ? "@CreationTimestamp" : "@UpdateTimestamp").append("\n");
                    }
                }

                // Enum
                if ("Enum".equals(field.getType())) {
                    sb.append("\n");
                    sb.append("    @Enumerated(EnumType.STRING)\n");
                    sb.append("    private ").append(field.getType()).append(" ").append(field.getName())
                            .append("; // Change your Enum type ;) \n\n");
                    continue;
                }

                // Regular field
                sb.append("    private ").append(field.getType()).append(" ").append(field.getName()).append(";\n");
            }
        }

        // Relations
        if (request.getRelations() != null) {
            for (RelationRequest relation : request.getRelations()) {
                if (relation.getType() == null || relation.getTargetEntity() == null || relation.getFieldName() == null ||
                        relation.getType().isBlank() || relation.getTargetEntity().isBlank() || relation.getFieldName().isBlank()) {
                    continue;
                }

                sb.append("\n");

                switch (relation.getType()) {
                    case "ManyToOne":
                        sb.append("    @ManyToOne\n");
                        sb.append("    @JoinColumn(name = \"").append(relation.getFieldName()).append("_id\")\n");
                        sb.append("    private ").append(relation.getTargetEntity())
                                .append(" ").append(relation.getFieldName()).append(";\n");
                        break;
                    case "OneToMany":
                        String mappedBy = relation.getMappedBy() != null && !relation.getMappedBy().isBlank()
                                ? relation.getMappedBy() : relation.getFieldName();
                        sb.append("    @OneToMany(mappedBy = \"").append(mappedBy)
                                .append("\", cascade = CascadeType.ALL, orphanRemoval = true)\n");
                        sb.append("    private List<").append(relation.getTargetEntity())
                                .append("> ").append(relation.getFieldName()).append(";\n");
                        break;
                    case "OneToOne":
                        sb.append("    @OneToOne\n");
                        sb.append("    @JoinColumn(name = \"").append(relation.getFieldName()).append("_id\")\n");
                        sb.append("    private ").append(relation.getTargetEntity())
                                .append(" ").append(relation.getFieldName()).append(";\n");
                        break;
                    case "ManyToMany":
                        sb.append("    @ManyToMany\n");
                        sb.append("    private List<").append(relation.getTargetEntity())
                                .append("> ").append(relation.getFieldName()).append(";\n");
                        break;
                }
            }
        }

        sb.append("\n}");
        return sb.toString();
    }
}
