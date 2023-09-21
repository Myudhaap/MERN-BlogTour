import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  getRelatedTours,
  getTourById,
  getTours,
  getToursSlice,
} from "../redux/features/tourSlice";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import moment from "moment";
import RelatedTours from "../components/RelatedTours";
import DisqusThread from "../components/DisqusThread";
import SkeletonSingleTour from "../components/skeletons/SkeletonSingleTour";

const SingleTour = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { tours: tour, loading } = useSelector((state) =>
    getTourById(state, id)
  );
  const { relatedTours } = useSelector(getToursSlice);
  const tags = tour?.tags;

  useEffect(() => {
    !tour && dispatch(getTours());
    tags && dispatch(getRelatedTours(tags));
    // eslint-disable-next-line
  }, [tags]);
  return (
    <MDBContainer style={{ marginTop: "80px" }}>
      {loading ? (
        <SkeletonSingleTour />
      ) : (
        <>
          <MDBCard className="mb-3">
            <MDBCardImage
              position="top"
              style={{ width: "100%", maxHeight: "600px" }}
              src={tour?.imageFile}
              alt={tour?.title}
            />
            <MDBCardBody>
              <MDBBtn
                tag={"a"}
                color="none"
                style={{ float: "left", color: "#000" }}
                onClick={() => navigate("/")}
              >
                <MDBIcon fas icon="long-arrow-alt-left" size="lg" />
              </MDBBtn>
              <h3 className="text-center">{tour?.title}</h3>
              <span>
                <p className="text-start tourName">Created By: {tour?.name}</p>
              </span>
              <div style={{ float: "left" }}>
                <span className="text-start">
                  {tour?.tags?.map((tag) => `#${tag}`)}
                </span>
              </div>
              <br />
              <MDBCardText className="text-start mt-2">
                <MDBIcon
                  style={{ float: "left", margin: "5px" }}
                  fas
                  icon="calendar-alt"
                  size="lg"
                />
                <small className="text-muted">
                  {moment(tour?.createdAt).fromNow()}
                </small>
              </MDBCardText>
              <MDBCardText className="lead mb-0 text-start">
                {tour?.description}
              </MDBCardText>
            </MDBCardBody>
            <RelatedTours relatedTours={relatedTours} tourId={id} />
          </MDBCard>
          <DisqusThread id={id} title={tour?.title} path={`/tour/${id}`} />
        </>
      )}
    </MDBContainer>
  );
};

export default SingleTour;
