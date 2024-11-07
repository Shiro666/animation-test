import React from "react";

export default function withLoadingComponent(comp: JSX.Element) {
    return (
        <React.Suspense fallback={<>Loading...</>}>
            {comp}
        </React.Suspense>
    )
}