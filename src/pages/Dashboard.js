import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBCardGroup,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getUser } from "../redux/features/authSlice";
import {
  deleteTour,
  getToursByUser,
  getToursUser,
} from "../redux/features/tourSlice";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { user } = useSelector(getUser);
  const userId = user?.result._id;
  const dispatch = useDispatch();
  const { tours, loading } = useSelector(getToursByUser);

  useEffect(() => {
    userId && dispatch(getToursUser(userId));
    // eslint-disable-next-line
  }, [userId]);

  const excerpt = (str) => {
    if (str.length > 45) {
      str = str.substring(0, 45) + "...";
    }
    return str;
  };

  if (loading)
    return (
      <div
        style={{
          width: "200px",
          padding: "15px",
          margin: "auto",
          alignContent: "center",
        }}
      >
        <Spinner />
      </div>
    );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure want to delete this tour ?")) {
      dispatch(deleteTour({ id, toast }));
    }
  };
  return (
    <div
      style={{
        margin: "auto",
        padding: "120px",
        maxWidth: "900px",
        alignContent: "center",
      }}
    >
      {tours?.length === 0 && (
        <h3>No Tour available with the user: {user?.result?.name}</h3>
      )}
      {tours?.length > 0 && (
        <>
          <h4 className="text-center">Dashboard: {user?.result?.name}</h4>
          <hr style={{ maxWidth: "570px" }} />
        </>
      )}

      {tours &&
        tours.map((tour) => (
          <MDBCardGroup key={tour._id}>
            <MDBCard style={{ maxWidth: "600px" }} className="mt-2">
              <MDBRow className="g-0">
                <MDBCol md={"4"}>
                  <MDBCardImage
                    className="rounded"
                    src={tour.imageFile}
                    alt={tour.title}
                    fluid
                  />
                </MDBCol>
                <MDBCol md={"8"}>
                  <MDBCardBody>
                    <MDBCardTitle className="text-start">
                      {tour.title}
                    </MDBCardTitle>
                    <MDBCardText className="text-start">
                      <small className="text-muted">
                        {excerpt(tour.description)}
                      </small>
                    </MDBCardText>
                    <div
                      style={{
                        marginLeft: "5px",
                        float: "right",
                        marginTop: "-60px",
                      }}
                    >
                      <MDBBtn className="mt-1" tag={"a"} color="none">
                        <MDBIcon
                          fas
                          icon="trash"
                          style={{ color: "#dd4b39" }}
                          size="lg"
                          onClick={() => handleDelete(tour._id)}
                        />
                      </MDBBtn>
                      <Link to={`/editTour/${tour._id}`}>
                        <MDBIcon
                          fas
                          icon="edit"
                          style={{ color: "#55acee", marginLeft: "10px" }}
                          size="lg"
                        />
                      </Link>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCardGroup>
        ))}
    </div>
  );
};

export default Dashboard;
