package mk.com.entitylab.backend.model.domain;

import lombok.Data;

import java.util.List;

@Data
public class EntityRequest {

    private String name;
    private String idName;
    private String idType;
    private List<FieldRequest> fields;
    private List<RelationRequest> relations;

}
