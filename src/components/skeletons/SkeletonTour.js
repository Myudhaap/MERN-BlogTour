import React from "react";
import "./skeleton.css";
import Skeleton from "./Skeleton";
import { MDBCard, MDBCardGroup } from "mdb-react-ui-kit";

const SkeletonTour = () => {
  return (
    <>
      <MDBCardGroup className="d-sm-flex justify-content-sm-center">
        <MDBCard className="h-100 mt-2 d-sm-flex" style={{ width: "20rem" }}>
          <Skeleton style={{ width: "100%", height: "180px" }} />
          <Skeleton classes="title width-100" />
          <Skeleton classes="text width-100" />
          <Skeleton classes="text width-100" />
        </MDBCard>
      </MDBCardGroup>
      <MDBCardGroup className="d-sm-flex justify-content-sm-center">
        <MDBCard className="h-100 mt-2 d-sm-flex" style={{ width: "20rem" }}>
          <Skeleton style={{ width: "100%", height: "180px" }} />
          <Skeleton classes="title width-100" />
          <Skeleton classes="text width-100" />
          <Skeleton classes="text width-100" />
        </MDBCard>
      </MDBCardGroup>
      <MDBCardGroup className="d-sm-flex justify-content-sm-center">
        <MDBCard className="h-100 mt-2 d-sm-flex" style={{ width: "20rem" }}>
          <Skeleton style={{ width: "100%", height: "180px" }} />
          <Skeleton classes="title width-100" />
          <Skeleton classes="text width-100" />
          <Skeleton classes="text width-100" />
        </MDBCard>
      </MDBCardGroup>
      <MDBCardGroup className="d-sm-flex justify-content-sm-center">
        <MDBCard className="h-100 mt-2 d-sm-flex" style={{ width: "20rem" }}>
          <Skeleton style={{ width: "100%", height: "180px" }} />
          <Skeleton classes="title width-100" />
          <Skeleton classes="text width-100" />
          <Skeleton classes="text width-100" />
        </MDBCard>
      </MDBCardGroup>
      <MDBCardGroup className="d-sm-flex justify-content-sm-center">
        <MDBCard className="h-100 mt-2 d-sm-flex" style={{ width: "20rem" }}>
          <Skeleton style={{ width: "100%", height: "180px" }} />
          <Skeleton classes="title width-100" />
          <Skeleton classes="text width-100" />
          <Skeleton classes="text width-100" />
        </MDBCard>
      </MDBCardGroup>
      <MDBCardGroup className="d-sm-flex justify-content-sm-center">
        <MDBCard className="h-100 mt-2 d-sm-flex" style={{ width: "20rem" }}>
          <Skeleton style={{ width: "100%", height: "180px" }} />
          <Skeleton classes="title width-100" />
          <Skeleton classes="text width-100" />
          <Skeleton classes="text width-100" />
        </MDBCard>
      </MDBCardGroup>
    </>
  );
};

export default SkeletonTour;
