import { Divider, Paper, Typography } from "@mui/material";

const titleStyle = {
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
    backgroundColor: "#dfe6e9",
    py: 1,
    px: 2,
};


export const SectionWrapper = ({ title, children, refProp, id }) => (
    <Paper elevation={3} sx={{ p: { md: 4, xs: 1 }, mt: 2, borderRadius: "12px" }} ref={refProp} id={id}>
        <Typography
            sx={titleStyle}
            component="h2"
        >
            {title}
        </Typography>
        <Divider sx={{ pt: 1 }} />
        {children}
    </Paper>
);
