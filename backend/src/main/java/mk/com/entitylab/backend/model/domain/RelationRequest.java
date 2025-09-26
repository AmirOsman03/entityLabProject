package mk.com.entitylab.backend.model.domain;

import lombok.Data;

@Data
public class RelationRequest {

    private String type;
    private String targetEntity;
    private String fieldName;
    private String mappedBy;

}
