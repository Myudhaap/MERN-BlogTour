import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
  MDBIcon,
  MDBBtn,
  MDBTooltip,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/features/authSlice";
import { likeTour } from "../redux/features/tourSlice";

const CardTour = ({ tour }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(getUser);
  const userId = user?.result?._id || user?.result?.googleId;

  const excerpt = (str) => {
    if (str.length > 45) {
      str = str.substring(0, 45) + "...";
    }
    return str;
  };

  const Likes = () => {
    if (tour.likes.length > 0) {
      return tour.likes.find((like) => like === userId) ? (
        <>
          <MDBIcon fas icon="thumbs-up" />
          &nbsp;
          {tour.likes.length > 2 ? (
            <MDBTooltip
              tag={"a"}
              title={`You and ${tour.likes.length - 1} other likes`}
            >
              {tour.likes.lenght} likes
            </MDBTooltip>
          ) : (
            `${tour.likes.length} Like${tour.likes.length > 1 ? "s" : ""}`
          )}
        </>
      ) : (
        <>
          <MDBIcon far icon="thumbs-up" />
          &nbsp;{tour.likes.length} {tour.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <MDBIcon far icon="thumbs-up" />
        &nbsp;Like
      </>
    );
  };

  const handleClick = () => {
    dispatch(likeTour(tour._id));
  };

  return (
    <MDBCardGroup className="d-sm-flex justify-content-sm-center">
      <MDBCard className="h-100 mt-2 d-sm-flex" style={{ maxWidth: "20rem" }}>
        <MDBCardImage
          src={tour.imageFile}
          alt={tour.title}
          position="top"
          style={{ maxWidth: "100%", height: "180px" }}
        />
        <div className="top-left">{tour.name}</div>
        <span className="text-start tag-card">
          {tour.tags.map((item, index) => (
            <Link key={index} to={`/tours/tag/${item}`}>
              #{item}
            </Link>
          ))}
          <MDBBtn
            style={{ float: "right" }}
            tag="a"
            color="none"
            onClick={!user?.result ? null : handleClick}
          >
            {!user?.result ? (
              <MDBTooltip title="Please login to like tour" tag="a">
                <Likes />
              </MDBTooltip>
            ) : (
              <Likes />
            )}
          </MDBBtn>
        </span>
        <MDBCardBody>
          <MDBCardTitle className="text-start">{tour.title}</MDBCardTitle>
          <MDBCardText className="text-start">
            {excerpt(tour.description)}
            <Link to={`/tour/${tour._id}`}>Read More</Link>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default CardTour;
