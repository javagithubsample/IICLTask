import React, { useEffect, useState } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function SwaggerPage() {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL || ""}/blog-api.yaml`)
      .then((res) => res.text())
      .then((yamlText) => setSpec(yamlText))
      .catch((err) => console.error("Error loading swagger spec:", err));
  }, []);

  if (!spec) return <p>Loading API docs...</p>;

  return (
    <div style={{ padding: 20 }}>
      <SwaggerUI spec={spec} docExpansion="list" defaultModelsExpandDepth={-1} />
    </div>
  );
}
