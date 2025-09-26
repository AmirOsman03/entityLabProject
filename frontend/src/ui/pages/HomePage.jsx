import React, {useState} from "react";
import {
    Box, Button, Container, Typography, TextField,
    Grid, Select, MenuItem, IconButton, Stack,
    Paper, Alert
} from "@mui/material";
import {
    AddCircle, RemoveCircle, PlayArrow,
    ContentCopy, Download
} from "@mui/icons-material";
import useEntityGenerator from "../../hooks/useEntityGenerator";

const HomePage = () => {
    const [className, setClassName] = useState("");
    const [idName, setIdName] = useState("id");
    const [idType, setIdType] = useState("Long");
    const [fields, setFields] = useState([{name: "", type: "String"}]);
    const [relations, setRelations] = useState([{type: "OneToMany", targetEntity: "", fieldName: "", mappedBy: ""}]);

    const {preview, loading, error, generateCode} = useEntityGenerator();

    // Field handlers
    const handleFieldChange = (index, key, value) => {
        const newFields = [...fields];
        newFields[index][key] = value;
        setFields(newFields);
    };
    const addField = () => setFields([...fields, {name: "", type: "String"}]);
    const removeField = (index) => setFields(fields.filter((_, i) => i !== index));

    // Relation handlers
    const handleRelationChange = (index, key, value) => {
        const newRelations = [...relations];
        newRelations[index][key] = value;
        setRelations(newRelations);
    };
    const addRelation = () => setRelations([...relations, {
        type: "OneToMany",
        targetEntity: "",
        fieldName: "",
        mappedBy: ""
    }]);
    const removeRelation = (index) => setRelations(relations.filter((_, i) => i !== index));

    const handleCopyCode = () => {
        navigator.clipboard.writeText(preview);
    };

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([preview], {type: "text/plain"});
        element.href = URL.createObjectURL(file);
        element.download = `${className}.java`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <Container maxWidth="md" sx={{py: 5}}>
            <Grid
                container
                direction="column"
                spacing={4}
            >
                {/* Form Section */}
                <Grid item xs={12}>
                    <Paper sx={{p: 4, width: '100%'}}>
                        <Stack spacing={3}>
                            <Typography variant="h5" fontWeight="700">Create Entity</Typography>

                            {/* Class Name */}
                            <TextField
                                label="Class Name"
                                value={className}
                                onChange={(e) => setClassName(e.target.value)}
                                fullWidth
                                size="medium"
                            />

                            {/* ID Section */}
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={6}>
                                    <TextField
                                        label="ID Name"
                                        value={idName}
                                        onChange={(e) => setIdName(e.target.value)}
                                        fullWidth
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Select
                                        value={idType}
                                        onChange={(e) => setIdType(e.target.value)}
                                        fullWidth
                                        size="small"
                                    >
                                        <MenuItem value="Long">Long</MenuItem>
                                        <MenuItem value="String">String</MenuItem>
                                        <MenuItem value="Integer">Integer</MenuItem>
                                    </Select>
                                </Grid>
                            </Grid>

                            {/* Fields Section */}
                            <Box>
                                <Stack spacing={2}>
                                    {fields.map((field, index) => (
                                        <Grid container spacing={1} alignItems="center" key={index}>
                                            <Grid item xs={5}>
                                                <TextField
                                                    label="Field name"
                                                    value={field.name}
                                                    onChange={(e) => handleFieldChange(index, "name", e.target.value)}
                                                    fullWidth
                                                    size="small"
                                                />
                                            </Grid>
                                            <Grid item xs={5}>
                                                <Select
                                                    value={field.type}
                                                    onChange={(e) => handleFieldChange(index, "type", e.target.value)}
                                                    fullWidth
                                                    size="small"
                                                >
                                                    <MenuItem value="String">String</MenuItem>
                                                    <MenuItem value="Long">Long</MenuItem>
                                                    <MenuItem value="Integer">Integer</MenuItem>
                                                    <MenuItem value="Double">Double</MenuItem>
                                                    <MenuItem value="Boolean">Boolean</MenuItem>
                                                    <MenuItem value="LocalDateTime">LocalDateTime</MenuItem>
                                                </Select>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <IconButton
                                                    onClick={() => removeField(index)}
                                                    color="error"
                                                    size="small"
                                                >
                                                    <RemoveCircle fontSize="small"/>
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    ))}
                                </Stack>
                                <Button
                                    startIcon={<AddCircle/>}
                                    onClick={addField}
                                    variant="outlined"
                                    fullWidth
                                    sx={{mt: 2}}
                                >
                                    Add Field
                                </Button>
                            </Box>

                            {/* Relations Section */}
                            <Box>
                                <Stack spacing={2}>
                                    {relations.map((relation, index) => (
                                        <Grid container spacing={1} alignItems="center" key={index}>
                                            <Grid item xs={3}>
                                                <Select
                                                    value={relation.type}
                                                    onChange={(e) => handleRelationChange(index, "type", e.target.value)}
                                                    fullWidth
                                                    size="small"
                                                >
                                                    <MenuItem value="OneToMany">OneToMany</MenuItem>
                                                    <MenuItem value="ManyToOne">ManyToOne</MenuItem>
                                                    <MenuItem value="OneToOne">OneToOne</MenuItem>
                                                    <MenuItem value="ManyToMany">ManyToMany</MenuItem>
                                                </Select>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <TextField
                                                    label="Target entity"
                                                    value={relation.targetEntity}
                                                    onChange={(e) => handleRelationChange(index, "targetEntity", e.target.value)}
                                                    fullWidth
                                                    size="small"
                                                />
                                            </Grid>
                                            <Grid item xs={3}>
                                                <TextField
                                                    label="Field name"
                                                    value={relation.fieldName}
                                                    onChange={(e) => handleRelationChange(index, "fieldName", e.target.value)}
                                                    fullWidth
                                                    size="small"
                                                />
                                            </Grid>
                                            <Grid item xs={2}>
                                                <TextField
                                                    label="Mapped By"
                                                    value={relation.mappedBy || ""}
                                                    onChange={(e) => handleRelationChange(index, "mappedBy", e.target.value)}
                                                    fullWidth
                                                    size="small"
                                                />
                                            </Grid>
                                            <Grid item xs={1}>
                                                <IconButton
                                                    onClick={() => removeRelation(index)}
                                                    color="error"
                                                    size="small"
                                                >
                                                    <RemoveCircle fontSize="small"/>
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    ))}
                                </Stack>
                                <Button
                                    startIcon={<AddCircle/>}
                                    onClick={addRelation}
                                    variant="outlined"
                                    fullWidth
                                    sx={{mt: 2}}
                                >
                                    Add Relationship
                                </Button>
                            </Box>

                            {/* Generate Button */}
                            <Button
                                variant="contained"
                                size="large"
                                fullWidth
                                onClick={() => generateCode(className, idName, idType, fields, relations)}
                                disabled={loading || !className.trim()}
                                startIcon={loading ? null : <PlayArrow/>}
                            >
                                {loading ? "Generating Code..." : "Generate Entity"}
                            </Button>

                            {error && (
                                <Alert severity="error">{error.message}</Alert>
                            )}
                        </Stack>
                    </Paper>
                </Grid>

                {/* Preview Section */}
                <Grid item xs={12}>
                    <Paper sx={{p: 4, width: '100%'}}>
                        <Stack spacing={2}>
                            <Typography variant="h6">Code Preview</Typography>
                            {preview ? (
                                <Paper sx={{
                                    p: 2,
                                    background: '#1e1e1e',
                                    color: '#d4d4d4',
                                    fontFamily: 'monospace',
                                    overflow: 'auto',
                                    height: 300
                                }}>
                                    <pre style={{margin: 0}}>{preview}</pre>
                                </Paper>
                            ) : (
                                <Typography variant="body2" color="text.secondary">
                                    Your generated code will appear here.
                                </Typography>
                            )}
                            <Stack direction="row" spacing={1}>
                                <Button onClick={handleCopyCode} startIcon={<ContentCopy/>} disabled={!preview}>
                                    Copy
                                </Button>
                                <Button onClick={handleDownload} startIcon={<Download/>} disabled={!preview}>
                                    Download
                                </Button>
                            </Stack>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default HomePage;
