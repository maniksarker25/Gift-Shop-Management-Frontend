import { TUser, useCurrentToken } from "../../../redux/features/auth/authSlice";
import { useGetMetaDataQuery } from "../../../redux/features/meta/metaApi";
import { useAppSelector } from "../../../redux/hooks";
import { verifyToken } from "../../../utils/verifyToken";
import CategoryBarChart from "./CategoryBarChart";
import ManagerLineChart from "./ManagerLineChart";
import ManagerOverview from "./ManagerOverview";
import SellerOverview from "./SellerOverview";
import ThemePieChart from "./ThemePieChart";

const DashboardOverview = () => {
  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token);
  }
  const { data } = useGetMetaDataQuery(undefined);

  const metaData = data?.data;
  return (
    <div>
      <h2
        style={{ fontSize: "22px", fontWeight: "600px", marginBottom: "20px" }}
      >
        Dashboard Overview
      </h2>
      <div>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4 lg:gap-16 mb-16">
          <div style={{ backgroundColor: "#F9FAFC" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "20px",
                borderRadius: "20px",
              }}
            >
              <div>
                <h2 style={{ fontSize: "20px" }}>Total Products</h2>
                <p style={{ fontSize: "35px" }}>{metaData?.totalProduct}</p>
              </div>
              <div
                style={{
                  backgroundColor: "#5C67F7",
                  height: "35px",
                  padding: "7px",
                  borderRadius: "100%",
                }}
              >
                <svg
                  style={{ stroke: "white" }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: "#F9FAFC" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "20px",
                borderRadius: "20px",
              }}
            >
              <div>
                <h2 style={{ fontSize: "20px" }}>Total Seller</h2>
                <p style={{ fontSize: "35px" }}>{metaData?.totalSeller}</p>
              </div>
              <div
                style={{
                  backgroundColor: "#E354D4",
                  height: "35px",
                  padding: "7px",
                  borderRadius: "100%",
                }}
              >
                <svg
                  style={{ stroke: "white" }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: "#F9FAFC" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px",
                borderRadius: "20px",
              }}
            >
              <div>
                <h2 style={{ fontSize: "20px" }}>Total Sale</h2>
                <p style={{ fontSize: "35px" }}>{metaData?.totalSale}</p>
              </div>
              <div
                style={{
                  backgroundColor: "#FF8E6F",
                  height: "35px",
                  padding: "7px",
                  borderRadius: "100%",
                }}
              >
                <svg
                  style={{ stroke: "white" }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: "#F9FAFC" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px",
                borderRadius: "20px",
              }}
            >
              <div>
                <h2 style={{ fontSize: "20px" }}>Total Revenue</h2>
                <p style={{ fontSize: "35px" }}>{metaData?.totalRevenue}</p>
              </div>
              <div
                style={{
                  backgroundColor: "#FF5D9F",
                  height: "35px",
                  padding: "7px",
                  borderRadius: "100%",
                }}
              >
                <svg
                  style={{ stroke: "white" }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div> */}
        {(user as TUser).role === "manager" ? (
          <ManagerOverview metaData={metaData} />
        ) : (
          <SellerOverview metaData={metaData} />
        )}
        <div className="lg:flex justify-between gap-12">
          {(user as TUser)?.role === "manager" && <ManagerLineChart />}
          <CategoryBarChart
            categoryBarChartData={metaData?.categoryBarChartData}
          />
          {(user as TUser)?.role === "seller" && (
            <ThemePieChart metaData={metaData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
