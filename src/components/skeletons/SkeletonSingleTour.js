import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import Skeleton from "./Skeleton";
import "./skeleton.css";
import React from "react";

const SkeletonSingleTour = () => {
  return (
    <MDBCard className="mb-3">
      <Skeleton style={{ width: "100%", height: "400px" }} />
      <MDBCardBody>
        <Skeleton classes="title width-100" />
        <Skeleton classes="text" style={{ marginBottom: "1rem" }} />
        <Skeleton classes="text" style={{ marginBottom: "1rem" }} />
        <Skeleton classes="text" style={{ marginBottom: "1rem" }} />
      </MDBCardBody>
    </MDBCard>
  );
};

export default SkeletonSingleTour;
