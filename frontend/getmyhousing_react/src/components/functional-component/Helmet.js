import React, { useEffect } from "react";
import PropTypes from "prop-types";

const Helmet = ({
    title = "Get My Housing - Your Trusted Real Estate Partner",
    description = "Get My Housing is your trusted partner for buying, selling, and renting properties.",
    keywords = "real estate, housing, buy property, sell property, rent property, Get My Housing",
    canonicalUrl = window.location.href,
    ogTitle = "Get My Housing - Your Trusted Real Estate Partner",
    ogDescription = "Get My Housing is your trusted partner...",
    ogImage = "https://www.getmyhousing.com/og-image.jpg",
    twitterTitle = "Get My Housing - Your Trusted Real Estate Partner",
    twitterDescription = "Get My Housing is your trusted partner...",
    twitterImage = "https://www.getmyhousing.com/twitter-image.jpg",
    schema = null
}) => {
    useEffect(() => {
        if (title) document.title = title;

        const setMetaTag = (name, value) => {
            const tag = document.querySelector(`meta[name="${name}"]`) || document.createElement("meta");
            tag.setAttribute("name", name);
            tag.setAttribute("content", value);
            document.head.appendChild(tag);
        };

        setMetaTag("description", description);
        setMetaTag("keywords", keywords);
        setMetaTag("twitter:title", twitterTitle);
        setMetaTag("twitter:description", twitterDescription);
        setMetaTag("twitter:image", twitterImage);

        const setMetaProperty = (property, value) => {
            const tag = document.querySelector(`meta[property="${property}"]`) || document.createElement("meta");
            tag.setAttribute("property", property);
            tag.setAttribute("content", value);
            document.head.appendChild(tag);
        };

        setMetaProperty("og:title", ogTitle);
        setMetaProperty("og:description", ogDescription);
        setMetaProperty("og:image", ogImage);

        let linkCanonical = document.querySelector('link[rel="canonical"]');
        if (!linkCanonical) {
            linkCanonical = document.createElement("link");
            linkCanonical.setAttribute("rel", "canonical");
            document.head.appendChild(linkCanonical);
        }
        linkCanonical.setAttribute("href", canonicalUrl);

        // Inject schema markup dynamically
        if (schema) {
            // Remove existing schema scripts
            document.querySelectorAll('script[type="application/ld+json"]').forEach((script) => script.remove());

            // If schema is an array, render multiple schemas
            if (Array.isArray(schema)) {
                schema.forEach((s) => {
                    const scriptSchema = document.createElement("script");
                    scriptSchema.setAttribute("type", "application/ld+json");
                    scriptSchema.textContent = JSON.stringify(s);
                    document.head.appendChild(scriptSchema);
                });
            } else {
                // If schema is a single object, render one schema
                const scriptSchema = document.createElement("script");
                scriptSchema.setAttribute("type", "application/ld+json");
                scriptSchema.textContent = JSON.stringify(schema);
                document.head.appendChild(scriptSchema);
            }
        }
    }, [title, description, keywords, canonicalUrl, ogTitle, ogDescription, ogImage, twitterTitle, twitterDescription, twitterImage, schema]);

    return null; // This component does not render UI
};

Helmet.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    keywords: PropTypes.string,
    canonicalUrl: PropTypes.string,
    ogTitle: PropTypes.string,
    ogDescription: PropTypes.string,
    ogImage: PropTypes.string,
    twitterTitle: PropTypes.string,
    twitterDescription: PropTypes.string,
    twitterImage: PropTypes.string,
    schema: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default Helmet;
