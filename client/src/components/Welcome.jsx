import React, { useContext, useState, PureComponent } from "react";
import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from 'recharts';

import * as api from "../api";

import { Loader } from './';

import { Select_Gender, Select_Age, Select_AttendingPhysician, Select_Chronic_Condition, Select_ClmProcedureCode, Select_County, Select_Deductible, Select_IPAnnualReimbursementAmt, Select_InscClaimAmtReimbursed, Select_NoOfDaysAdmitted, Select_Race, Select_State } from "./Input";

import { 
    Chronic_Condition, 
    Age, 
    Claim_Procedure_Code,
    Attending_Physician, 
    InsClmAmtReimbursed, 
    IPAnnualReimbursementAmt,  
    No_Of_Days_Admitted, 
    Deductible_Amount_Paid, 
    State, Race, County, Gender } from "../utils/utils";


const labelStyles = "min-h-[10px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center text-white";


const Welcome = () => {

    const [gender, setGender] = useState("Female");
    const [chronicCondition, setChronicCondition] = useState("Diabetes");
    const [dedAmount, setDedAmount] = useState(34000);
    const [state, setState] = useState("Edinburgh");
    const [age, setAge] = useState(12);
    const [days, setDays] = useState(1);
    const [clProCode, setClProCode,] = useState("71988");
    const [attendingPhy, setAttendingPhy] = useState("PHY319565");
    const [county, setCounty] = useState("Scalloway");
    const [reimbursed, setReimbursed] = useState(80);
    const [annualReimbursed, setAnnualReimbursed] = useState(2500)
    const [disable, setDisable] = useState(false);
    const [openTab, setOpenTab] = useState(1);
    const [visible, setVisible] = useState(false);

    const [prediction, setPrediction] = useState();
    const [scores, setScores] = useState([])
    const [meanAbsoluteError, setMeanAbsoluteError] = useState(0)
    const [accuracyScore, setAccuracyScore] = useState(0)

    const pred = parseInt(prediction) ? 'Not Fraud' : 'Fraud'
    const score = accuracyScore

    const data = [
        {
            name: State[0],
            uv: 0,
            pv: 1,
            amt: 0.8,
          },
          {
            name: State[1],
            uv: 0.6,
            pv: 0.8,
            amt: 0.9,
          },
          {
            name: state,
            uv: score,
            pv: 0.7,
            amt: 0.6,
          },
          {
            name: State[3],
            uv: 1,
            pv: 0.3,
            amt: 0.5,
          }
    ]

    const data1 = [
        {
            name: Deductible_Amount_Paid[0],
            uv: 0,
            pv: 1,
            amt: 0.8,
          },
          {
            name: Deductible_Amount_Paid[1],
            uv: 0.6,
            pv: 0.8,
            amt: 0.9,
          },
          {
            name: dedAmount,
            uv: score,
            pv: 0.7,
            amt: 0.6,
          },
          {
            name: Deductible_Amount_Paid[3],
            uv: 1,
            pv: 0.3,
            amt: 0.5,
          },
          {
            name: Deductible_Amount_Paid[4],
            uv: 1,
            pv: 0.4,
            amt: 0.5,
          },
          {
            name: Deductible_Amount_Paid[5],
            uv: 1,
            pv: 0.6,
            amt: 0.5,
          }
    ]

    const data2 = [
        {
            name: IPAnnualReimbursementAmt[0],
            uv: 0,
            pv: 1,
            amt: 0.8,
          },
          {
            name: IPAnnualReimbursementAmt[1],
            uv: 0.6,
            pv: 0.8,
            amt: 0.9,
          },
          {
            name: reimbursed,
            uv: score,
            pv: 0.7,
            amt: 0.6,
          },
          {
            name: IPAnnualReimbursementAmt[3],
            uv: 1,
            pv: 0.3,
            amt: 0.5,
          }
    ]
    
    const runPred = async (gender, chronicCondition, dedAmount, state, age, days, clProCode, attendingPhy, county, reimbursed, annualReimbursed) => {
        setDisable(true)
        setPrediction("Scoring")
        try {
          const res = await api.fetchPosts({
            gender, chronicCondition, dedAmount, state, age, days, clProCode, attendingPhy, county, reimbursed, annualReimbursed
          })
          console.log(gender, chronicCondition, dedAmount, state, age, days, clProCode, attendingPhy, county, reimbursed, annualReimbursed)
          console.log(res)
          const result = res.data.predictions[0].values[0];
          const mae = res.data.predictions[0].values[0][1][0]
          const accSc = res.data.predictions[0].values[0][1][1]
          setVisible(true);
          setPrediction(result);
          setMeanAbsoluteError(mae)
          setAccuracyScore(accSc)
          console.log(mae)
      
          setScores([...scores, 
            {
              group: gender + chronicCondition + dedAmount + state + age + days + clProCode + attendingPhy + county + reimbursed + annualReimbursed,
              value: res.data.predictions[0].values[0][0]
            }  
          ]);
          setDisable(false)
          console.log(scores)
        } catch (error) {
          console.log(error)
        }
    
       
      }


    return (

        

        <div className="flex w-full justify-center items-center">
            <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
                    <div className="p-5 sm:w-80 w-full flex flex-col justify-start items-center blue-glassmorphism">

                        <label htmlFor="exampleFormControlInput1" className={labelStyles}>Gender</label>
                        <Select_Gender 
                            onChange={(e) => setGender(e.target.value)}
                            name="Gender" type="text" />

                        <label htmlFor="exampleFormControlInput1" className={labelStyles}
                            >Chronic Condition</label>
                        <Select_Chronic_Condition 
                            onChange={(e) => setChronicCondition(e.target.value)} 
                            name="Chronic_Condition" type="text" />

                        <label htmlFor="exampleFormControlInput1" className={labelStyles}
                            >Deductible Amount Paid</label>
                        <Select_Deductible 
                            name="DeductibleAmtPaid"
                            onChange={(e) => setDedAmount(e.target.value)}
                            type="text" />

                        <label htmlFor="exampleFormControlInput1" className={labelStyles}
                            >State</label>
                        <Select_State 
                            name="Age"
                            onChange={(e) => setState(e.target.value)}
                            type="text" />

                        <label htmlFor="exampleFormControlInput1" className={labelStyles}
                            >Age</label>
                        <Select_Age 
                            name="Age" 
                            onChange={(e) => setAge(e.target.value)}
                            type="text" />
                        
                        <label htmlFor="exampleFormControlInput1" className={labelStyles}
                            >No Of Days Admitted</label>
                        <Select_NoOfDaysAdmitted 
                            name="NoOfDaysAdmitted" 
                            onChange={(e) => setDays(e.target.value)}
                            type="text" /> 

                        <div className="h-[1px] w-full bg-white-400 my-2" />

                    </div>
                    <div className="p-5 sm:w-80 w-full flex flex-col justify-start items-center blue-glassmorphism">

                    <label htmlFor="exampleFormControlInput1" className={labelStyles}
                            >Claim Procedure Code</label>
                        <Select_ClmProcedureCode 
                            name="ClmProcedureCode" 
                            onChange={(e) => setClProCode(e.target.value)}
                            type="text" />

                        <label htmlFor="exampleFormControlInput1" className={labelStyles}
                            >Attending Physician</label>
                        <Select_AttendingPhysician 
                            name="AttendingPhysician" 
                            onChange={(e) => setAttendingPhy(e.target.value)}
                            type="text" />

                        <label htmlFor="exampleFormControlInput1" className={labelStyles}
                            >InsClmAmtReimbursed</label>
                        <Select_InscClaimAmtReimbursed 
                            name="nscClaimAmtReimbursed"
                            onChange={(e) => setReimbursed(e.target.value)}
                            type="text" />

                        <label htmlFor="exampleFormControlInput1" className={labelStyles}
                            >IPAnnualReimbursementAmt</label>
                        <Select_IPAnnualReimbursementAmt 
                            name="IPAnnualReimbursementAmt" 
                            onChange={(e) => setAnnualReimbursed(e.target.value)}
                            type="text" />

                        <label htmlFor="exampleFormControlInput1" className={labelStyles}
                            >County</label>
                        <Select_County 
                            name="County" 
                            onChange={(e) => setCounty(e.target.value)}
                            type="text" /> 

                        {false ? (
                            <Loader />
                        ) : (
                            <button 
                                disabled={disable}
                                type="button"
                                onClick={(e) => runPred(gender, chronicCondition, dedAmount, state, age, days, clProCode, attendingPhy, county, reimbursed, annualReimbursed) }
                                className="flex flex-row w=2 justify-center items-center my-5 bg-[#2952e3] p-3 rounded-half cursor-pointer hover:bg-[#2546bd]">
                                <p className="text-white text-base font-semibold">
                                    Predict
                                </p>
                            </button>
                        )}

                        {prediction !== "Scoring" && prediction ?
                            "" : ""}
                            
                            <p className="text-white text-base font-semibold">
                                {prediction == "Scoring" ? (
                                    <Loader />
                                ) : !prediction ? "" :  `The model predicted: ${pred} `}
                                <br />
                                <p>Mean Absolute Error: {meanAbsoluteError}</p>
                                <br />
                                <p>Accuracy Score: {score}</p>
                                
                            </p>

                            
                   

                    </div>

                <div className="flex flex-1 justify-start flex-col md:mr-10 ml-10">
                   
                {visible ? 
                <>
                    <div className="flex flex-wrap">
                        <div className="w-full">
                        <ul
                            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                            role="tablist"
                        >
                            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a
                                className={
                                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                (openTab === 1
                                    ? "text-white bg-" + "blue" + "-600"
                                    : "text-" + "blue" + "-600 bg-white")
                                }
                                onClick={e => {
                                e.preventDefault();
                                setOpenTab(1);
                                }}
                                data-toggle="tab"
                                href="#link1"
                                role="tablist"
                            >
                                State - Score
                            </a>
                            </li>
                            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a
                                className={
                                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                (openTab === 2
                                    ? "text-white bg-" + "blue" + "-600"
                                    : "text-" + "blue" + "-600 bg-white")
                                }
                                onClick={e => {
                                e.preventDefault();
                                setOpenTab(2);
                                }}
                                data-toggle="tab"
                                href="#link2"
                                role="tablist"
                            >
                                DeductibleAmount - Score
                            </a>
                            </li>
                            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a
                                className={
                                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                (openTab === 3
                                    ? "text-white bg-" + "blue" + "-600"
                                    : "text-" + "blue" + "-600 bg-white")
                                }
                                onClick={e => {
                                e.preventDefault();
                                setOpenTab(3);
                                }}
                                data-toggle="tab"
                                href="#link3"
                                role="tablist"
                            >
                                Reimbursed - Score
                            </a>
                            </li>
                        </ul>
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                            <div className="px-4 py-5 flex-auto">
                            <div className="tab-content tab-space">
                                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                    <ComposedChart
                                    width={500}
                                    height={400}
                                    data={data}
                                    margin={{
                                        top: 20,
                                        right: 80,
                                        bottom: 20,
                                        left: 20,
                                    }}
                                    >
                                    <CartesianGrid stroke="#f5f5f5" />
                                    <XAxis dataKey="name" label={{ value: 'County', position: 'insideBottomRight', offset: 0 }} scale="band" />
                                    <YAxis label={{ value: 'Score Index', angle: -90, position: 'insideLeft' }} />
                                    <Tooltip />
                                    <Legend />
                                    <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
                                    <Bar dataKey="pv" barSize={20} fill="#413ea0" />
                                    <Line type="monotone" dataKey="uv" stroke="#ff7300" />
                                    </ComposedChart>
                                </div>
                                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                    <ComposedChart
                                    width={500}
                                    height={400}
                                    data={data1}
                                    margin={{
                                        top: 20,
                                        right: 80,
                                        bottom: 20,
                                        left: 20,
                                    }}
                                    >
                                    <CartesianGrid stroke="#f5f5f5" />
                                    <XAxis dataKey="name" label={{ value: 'Deductible Amount', position: 'insideBottomRight', offset: 0 }} scale="band" />
                                    <YAxis label={{ value: 'Score Index', angle: -90, position: 'insideLeft' }} />
                                    <Tooltip />
                                    <Legend />
                                    <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
                                    <Bar dataKey="pv" barSize={20} fill="#413ea0" />
                                    <Line type="monotone" dataKey="uv" stroke="#ff7300" />
                                    </ComposedChart>
                                </div>
                                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                                    <ComposedChart
                                    width={500}
                                    height={400}
                                    data={data2}
                                    margin={{
                                        top: 20,
                                        right: 80,
                                        bottom: 20,
                                        left: 20,
                                    }}
                                    >
                                    <CartesianGrid stroke="#f5f5f5" />
                                    <XAxis dataKey="name" label={{ value: 'Reimbursed Amount', position: 'insideBottomRight', offset: 0 }} scale="band" />
                                    <YAxis label={{ value: 'Score Index', angle: -90, position: 'insideLeft' }} />
                                    <Tooltip />
                                    <Legend />
                                    <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
                                    <Bar dataKey="pv" barSize={20} fill="#413ea0" />
                                    <Line type="monotone" dataKey="uv" stroke="#ff7300" />
                                    </ComposedChart>
                                </div>
                            </div>
                            </div>
                        </div>
                        
                        </div>
                    </div>
                 </>
                 : null }
                </div>
                
                
            </div>
        </div>
    );
}

export default Welcome;