import React from 'react'
import "./MySubgreddit_stats.css"
import NavDash_for_subg  from "../NavDash_for_subg/NavDash_for_subg"

import Sidebar from "./sidebar/Sidebar";
import Feed from "./feed/Feed";
import Rightbar from "./rightbar/Rightbar";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { useParams } from 'react-router-dom';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
const MyDashboard = () => {
  const navigate = useNavigate()
  const handleKeyPress = useCallback((event) => {
    if(event.key === 'B')
      navigate('./..')
    console.log(`Key pressed: ${event.key}`);
  }, []);

  useEffect(() => {
    // attach the event listener
    document.addEventListener('keydown', handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);
  const {id} = useParams()
  // console.log("here in  dash")
  let [post_data,set_post_data] = useState([]);
  let [people_data,set_people_data] = useState([]);
  let [visiting_data, set_visiting_data]=useState([]);
  let [reported_data, set_reported_data]=useState([]);
  const get_url = "http://localhost:5000/api/get_all_post_info";
    useEffect (() => {
        axios.post(get_url,{Subg_id : id}).then(
            res => {
                console.log("printing the res.data",res.data);
                // store_of_my_subgreddits = res.data;
                set_post_data(res.data);
              }   
              )
            },[])
      console.log("Printing the store_of_subg : ",post_data);
      const for_people = "http://localhost:5000/api/people_and_time";
      useEffect (() => {
        axios.post(for_people,{_id : id}).then(
            res => {
                console.log("printing the res.data",res.data);
                // store_of_my_subgreddits = res.data;
                set_people_data(res.data);
              }   
              )
            },[])
        console.log("printing the people data: ",people_data)
        const for_vis = "http://localhost:5000/api/visiting_a_subg";
        useEffect (() => {
          axios.post(for_vis,{_id : id}).then(
              res => {
                  console.log("printing the res.data",res.data);
                  // store_of_my_subgreddits = res.data;
                  set_visiting_data(res.data);
                }   
                )
              },[])
              console.log("printing the visiting data: ",visiting_data)

              const for_reported = "http://localhost:5000/api/for_rep_vs_del";
              useEffect (() => {
                axios.post(for_reported,{_id : id}).then(
                    res => {
                        console.log("printing the res.data",res.data);
                        // store_of_my_subgreddits = res.data;
                        set_reported_data(res.data);
                      }   
                      )
                    },[])
                    console.log("printing the reported data: ",reported_data)
              
      let arr1 = people_data.map((ele)=>ele.Time);
      let arr2 =  people_data.map((ele)=>ele.People.length);
      arr1.unshift("Subgreddit Created")
      arr2.unshift(1);
  return (
    <>
    <NavDash_for_subg id={id}/>
    <div className="homeContainer">
        <Sidebar />
        {/* <Feed/> */}
        <div className="feed">
          <div className="feedWrapper">
          <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Line Chart</h2>
    
      <Line
        data={
          {
            labels: 
            post_data.map((ele)=>ele.Date), 
            datasets: [
              {
                label: "Number of Posts vs Date",
                data: post_data.map((ele)=>ele.Date_Posts.length),
                backgroundColor: [
                  "rgba(75,192,192,1)",
                  "#ecf0f1",
                  "#50AF95",
                  "#f3ba2f",
                  "#2a71d0"
                ],
                borderColor: "black",
                borderWidth: 2
              }
            ]
          }
        }
        options={{  
          plugins: {
            title: {
              display: true,
              text: "Number of Posts vs Date"
            },
            legend: {
              display: false
            }
          }
        }}
      />
      <Line
        data={
          {
            labels: 
            arr1 , 
            datasets: [
              {
                label: "Number of Users vs Time",
                data: arr2,
                backgroundColor: [
                  "rgba(75,192,192,1)",
                  "#ecf0f1",
                  "#50AF95",
                  "#f3ba2f",
                  "#2a71d0"
                ],
                borderColor: "black",
                borderWidth: 2
              }
            ]
          }
        }
        options={{  
          plugins: {
            title: {
              display: true,
              text: "Number of Users vs Time"
            },
            legend: {
              display: false
            }
          }
        }}
      />
      <Line
        data={
          {
            labels: 
            visiting_data.map((ele)=>ele.Date), 
            datasets: [
              {
                label: "Number of Visits vs Date",
                data: visiting_data.map((ele)=>ele.Vis.length),
                backgroundColor: [
                  "rgba(75,192,192,1)",
                  "#ecf0f1",
                  "#50AF95",
                  "#f3ba2f",
                  "#2a71d0"
                ],
                borderColor: "black",
                borderWidth: 2
              }
            ]
          }
        }
        options={{  
          plugins: {
            title: {
              display: true,
              text: "Number of Visits vs Date"
            },
            legend: {
              display: false
            }
          }
        }}
      />
      <Line
        data={
          {
            labels: 
            reported_data.Deleted, 
            datasets: [
              {
                label: "Number of Reported vs Deleted",
                data: reported_data.Reported,
                backgroundColor: [
                  "rgba(75,192,192,1)",
                  "#ecf0f1",
                  "#50AF95",
                  "#f3ba2f",
                  "#2a71d0"
                ],
                borderColor: "black",
                borderWidth: 2
              }
            ]
          }
        }
        options={{  
          plugins: {
            title: {
              display: true,
              text: "Number of Reported vs Deleted"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
          </div>
        </div>
        <Rightbar/>
      </div>
    </>
  )
}

export default MyDashboard