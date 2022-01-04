import React from "react";

const Spinner = () => {
    return (
        <>
            <div className="text-center" style={{marginTop: "200px"}}>
                <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        </>
    )
}

export default Spinner;