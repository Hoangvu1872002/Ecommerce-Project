import React, { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Pie, Bar, Line } from "react-chartjs-2";
import { apiGetAllOrders } from "../../apis";

const Dashboard = () => {
  const [orders, setOrders] = useState();

  const fetchOrder = async () => {
    const response = await apiGetAllOrders();
    if (response.success) {
      setOrders(response.order);
    }
  };

  const countOrdersSuccessed = orders?.filter(
    (e) => e.status === "Successed"
  ).length;
  const countOrdersCancelled = orders?.filter(
    (e) => e.status === "Cancelled"
  ).length;
  const countOrdersProccessing = orders?.filter(
    (e) => e.status === "Proccessing"
  ).length;
  const countOrdersShipping = orders?.filter(
    (e) => e.status === "Shipping"
  ).length;

  const month = [
    {
      title: "January",
      total: "",
      orderSuccessed: "",
      orderCancelled: "",
      value: 1,
    },
    {
      title: "February",
      total: "",
      orderSuccessed: "",
      orderCancelled: "",
      value: 2,
    },
    {
      title: "March",
      total: "",
      orderSuccessed: "",
      orderCancelled: "",
      value: 3,
    },
    {
      title: "April",
      total: "",
      orderSuccessed: "",
      orderCancelled: "",
      value: 4,
    },
    {
      title: "May",
      total: "",
      orderSuccessed: "",
      orderCancelled: "",
      value: 5,
    },
    {
      title: "June",
      total: "",
      orderSuccessed: "",
      orderCancelled: "",
      value: 6,
    },
    {
      title: "July",
      total: "",
      orderSuccessed: "",
      orderCancelled: "",
      value: 7,
    },
    {
      title: "August",
      total: "",
      orderSuccessed: "",
      orderCancelled: "",
      value: 8,
    },
    {
      title: "September",
      total: "",
      orderSuccessed: "",
      orderCancelled: "",
      value: 9,
    },
    {
      title: "October",
      total: "",
      orderSuccessed: "",
      orderCancelled: "",
      value: 10,
    },
    {
      title: "November",
      total: "",
      orderSuccessed: "",
      orderCancelled: "",
      value: 11,
    },
    {
      title: "December",
      total: "",
      orderSuccessed: "",
      orderCancelled: "",
      value: 12,
    },
  ];

  for (let i = 0; i < month.length; i++) {
    const data = orders?.filter(
      (e) => new Date(e.updatedAt).getMonth() + 1 === month[i].value
    );

    month[i].total = data?.reduce((sum, el) => +el?.total + sum, 0);
    month[i].orderSuccessed = data?.filter(
      (e) => e.status === "Successed"
    ).length;
    month[i].orderCancelled = data?.filter(
      (e) => e.status === "Cancelled"
    ).length;
  }

  console.log(month.title);

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div className="w-full relative h-full">
      <h1 className="fixed z-50 bg-gray-100 w-full h-[75px] flex justify-between items-center text-3xl font-bold px-5 border-b">
        <span>Dashboard</span>
      </h1>

      <div className="pt-[75px] px-5 h-full w-full ">
        <div className="pt-5 flex flex-col h-full gap-4 w-full">
          <div className="flex-4 w-full flex gap-4">
            <div className="flex-2 py-3 px-4 bg-white rounded-xl"></div>
            <div className="flex-5 py-3 px-4 bg-white rounded-xl">
              <Bar
                data={{
                  labels: month.map((e) => e.title),
                  datasets: [
                    {
                      label: "Total monthly revenue",
                      data: month.map((e) => e.total),
                    },
                  ],
                }}
              ></Bar>
            </div>
          </div>
          <div className="flex-6 w-full">
            <div className="  flex w-full gap-4 h-full pb-5">
              <div className="flex-5 py-3 px-4 bg-white rounded-xl">
                <Line
                  data={{
                    labels: month.map((e) => e.title),
                    datasets: [
                      {
                        label: "Successed",
                        data: month.map((e) => e.orderSuccessed),
                        borderColor: "rgb(0, 204, 0)",
                        fill: false,
                        tension: 0.2,
                      },
                      {
                        label: "Cancelled",
                        data: month.map((e) => e.orderCancelled),
                        borderColor: "rgb(204, 0, 0)",
                        fill: false,
                        tension: 0.2,
                      },
                    ],
                  }}
                ></Line>
              </div>
              <div className="flex-2 py-3 px-4 bg-white rounded-xl flex items-center justify-center">
                <Pie
                  data={{
                    labels: [
                      "Proccessing",
                      "Shipping",
                      "Successed",
                      "Cancelled",
                    ],
                    datasets: [
                      {
                        label: "Revenue",
                        data: [
                          countOrdersProccessing,
                          countOrdersShipping,
                          countOrdersSuccessed,
                          countOrdersCancelled,
                        ],
                        backgroundColor: [
                          "rgb(0, 204, 204)",
                          "rgb(204, 204, 0)",
                          "rgb(0, 204, 0)",
                          "rgb(204, 0, 0)",
                        ],
                      },
                    ],
                    hoverOffset: 4,
                  }}
                ></Pie>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
