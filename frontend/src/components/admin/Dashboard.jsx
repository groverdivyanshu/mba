import React from "react";
import { Link } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, ArcElement, Legend } from "chart.js";
import Loader from "../layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAdminStats } from "../../redux/actions/admin";
//  This code registers three plugins for ChartJS, a popular JavaScript library for creating charts. The Tooltip plugin adds a tooltip to the chart, which displays information about the data point when the user hovers over it. The ArcElement plugin adds an arc to the chart, which is a type of chart that displays data as a circular graph. The Legend plugin adds a legend to the chart, which is a key that explains what each color or shape in the chart represents. Registering these plugins allows you to use them in your ChartJS charts.
ChartJS.register(Tooltip, ArcElement, Legend); // after import ChartJS this line must be mandatory
// hear this box relived data from return / <article> / <box>  . and this is show on browser
const Box = ({ title, value }) => (
  <div>
    <h3>
     {/* if {title === "Income" so add rupees symbol */}     
      {title === "Income" && "₹"}
      {value}
    </h3>
    <p>{title}</p>
  </div>
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, usersCount, ordersCount, totalIncome } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(getAdminStats());
  }, [dispatch]);
  
// this is the data which show on chart 
  const data = {
    // this is label that mean this 3 will be part of chart 
    labels: ["Preparing", "Shipped", "Delivered"],
    datasets: [
      {
        label: "# of orders",
        // this is the actual data which measure chart size  
        data: ordersCount
          ? [ordersCount.preparing, ordersCount.shipped, ordersCount.delivered]
          : [0, 0, 0],
          // there are the 3 property which i show on chart this 3 property have 3 different backgroundColor 
        backgroundColor: [
          "rgba(159,63,176,0.1)",
          "rgba(78,63,176,0.2)",
          "rgba(156,0,60,0.3)",
        ],
        borderColor: ["rgb(159,63,176)", "rgb(78,63,176)", "rgb(156,0,60)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className="dashboard">
      {loading === false ? (
        <main>
          <article>
              {/* hear i through data of title and  value which is access by Box in line 12 to relived this data show it on browser */}
            <Box title="Users" value={usersCount} />
            <Box title="Orders" value={ordersCount.total} />
            <Box title="Income" value={totalIncome} />
          </article>

          <section>
            <div>
               {/* hear add this 2 link as a button , this 2 link exist on src/components/admin/  mean this folder */}
              <Link to="/admin/orders">View Orders</Link>
              <Link to="/admin/users">View Users</Link>
            </div>

            <aside>
               {/* hear use Doughnut from "react-chartjs-2" package . now access data using this data={data} . hear i access data and show it on round chart . so to access data from line 33 */}
              <Doughnut data={data} />
            </aside>
          </section>
        </main>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default Dashboard;
