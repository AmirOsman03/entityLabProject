package mk.com.entitylab.backend.web.controller;

import mk.com.entitylab.backend.model.domain.EntityRequest;
import mk.com.entitylab.backend.service.domain.EntityGeneratorService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/generator")
public class EntityController {

    private final EntityGeneratorService entityGeneratorService;

    public EntityController(EntityGeneratorService entityGeneratorService) {
        this.entityGeneratorService = entityGeneratorService;
    }

    @PostMapping("/generate-entity")
    public Map<String, String> generate(@RequestBody EntityRequest request) {
        String code = entityGeneratorService.generateEntity(request);
        return Map.of("code", code);
    }

}

