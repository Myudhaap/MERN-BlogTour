import React, { useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import {
  getTours,
  getToursSlice,
  setCurrentPage,
} from "../redux/features/tourSlice";
import CardTour from "../components/CardTour";
import Pagination from "../components/Pagination";
import { useLocation } from "react-router-dom";
import SkeletonTour from "../components/skeletons/SkeletonTour";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const { tours, loading, currentPage, numberOfPages } =
    useSelector(getToursSlice);
  const dispatch = useDispatch();
  const query = useQuery();
  const searchQuery = query.get("searchQuery");
  const location = useLocation();

  useEffect(() => {
    dispatch(getTours(currentPage));
    // eslint-disable-next-line
  }, [currentPage]);

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "1000px",
        alignContent: "center",
      }}
    >
      <MDBRow className="mt-5">
        <MDBCol>
          <MDBContainer>
            <MDBRow className="row-cols-1 row-cols-md-3 g-3 text-center">
              {loading && <SkeletonTour />}
              {tours.length === 0 && !loading ? (
                <>
                  {tours.length === 0 && location.pathname === "/" && (
                    <MDBTypography className="text-center mb-0" tag="h2">
                      No Tours Found
                    </MDBTypography>
                  )}
                  {tours.length === 0 && location.pathname !== "/" && (
                    <MDBTypography className="text-center mb-0" tag="h2">
                      We couldn't find any matches for "{searchQuery}"
                    </MDBTypography>
                  )}
                </>
              ) : (
                tours.map((item, index) => <CardTour key={index} tour={item} />)
              )}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
      {tours.length > 0 && (
        <Pagination
          setCurrentPage={setCurrentPage}
          numberOfPages={numberOfPages}
          currentPage={currentPage}
          dispatch={dispatch}
        />
      )}
    </div>
  );
};

export default Home;
