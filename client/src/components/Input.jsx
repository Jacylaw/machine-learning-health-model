import { Chronic_Condition, Age, Claim_Procedure_Code, Attending_Physician, InsClmAmtReimbursed, 
    IPAnnualReimbursementAmt,  No_Of_Days_Admitted, Deductible_Amount_Paid, State, Race, County, Gender } from "../utils/utils";

export const Select_Gender = ({placeholder, name, type, value }) => (
    <select 
        placeholder={placeholder}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
        type={type}
        value={value}
        name={name}
    >
        {Gender.map((item, index) => (
            <option key={index + item}>{item}</option>
        ))}
        
    </select>
)

export const Select_Chronic_Condition = ({placeholder, name, type, value }) => (
    <select 
        placeholder={placeholder}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
        type={type}
        value={value}
        name={name}
    >
        {Chronic_Condition.map((item, index) => (
            <option key={index + item}>{item}</option>
        ))}
        
    </select>
)

export const Select_Deductible = ({placeholder, name, type, value }) => (
    <select 
        placeholder={placeholder}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
        type={type}
        value={value}
        name={name}
    >
        {Deductible_Amount_Paid.map((item, index) => (
            <option key={index + item}>{item}</option>
        ))}
        
    </select>
)

export const Select_Age = ({placeholder, name, type, value }) => (
    <select 
        placeholder={placeholder}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
        type={type}
        value={value}
        name={name}
    >
        {Age.map((item, index) => (
            <option key={index + item}>{item}</option>
        ))}
        
    </select>
)

export const Select_State = ({placeholder, name, type, value }) => (
    <select 
        placeholder={placeholder}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
        type={type}
        value={value}
        name={name}
    >
        {State.map((item, index) => (
            <option key={index + item}>{item}</option>
        ))}
        
    </select>
)

export const Select_NoOfDaysAdmitted = ({placeholder, name, type, value }) => (
    <select 
        placeholder={placeholder}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
        type={type}
        value={value}
        name={name}
    >
        {No_Of_Days_Admitted.map((item, index) => (
            <option key={index + item}>{item}</option>
        ))}
        
    </select>
)

export const Select_ClmProcedureCode = ({placeholder, name, type, value }) => (
    <select 
        placeholder={placeholder}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
        type={type}
        value={value}
        name={name}
    >
        {Claim_Procedure_Code.map((item, index) => (
            <option key={index + item}>{item}</option>
        ))}
        
    </select>
)

export const Select_AttendingPhysician = ({placeholder, name, type, value }) => (
    <select 
        placeholder={placeholder}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
        type={type}
        value={value}
        name={name}
    >
        {Attending_Physician.map((item, index) => (
            <option key={index + item}>{item}</option>
        ))}
        
    </select>
)

export const Select_InscClaimAmtReimbursed = ({placeholder, name, type, value }) => (
    <select 
        placeholder={placeholder}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
        type={type}
        value={value}
        name={name}
    >
        {InsClmAmtReimbursed.map((item, index) => (
            <option key={index + item}>{item}</option>
        ))}
        
    </select>
)

export const Select_IPAnnualReimbursementAmt = ({placeholder, name, type, value }) => (
    <select 
        placeholder={placeholder}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
        type={type}
        value={value}
        name={name}
    >
        {IPAnnualReimbursementAmt.map((item, index) => (
            <option key={index + item}>{item}</option>
        ))}
        
    </select>
)

export const Select_County = ({placeholder, name, type, value }) => (
    <select 
        placeholder={placeholder}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
        type={type}
        value={value}
        name={name}
    >
        {County.map((item, index) => (
            <option key={index + item}>{item}</option>
        ))}
        
    </select>
)

export const Select_Race = ({placeholder, name, type, value }) => (
    <select 
        placeholder={placeholder}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
        type={type}
        value={value}
        name={name}
    >
        {Race.map((item, index) => (
            <option key={index + item}>{item}</option>
        ))}
        
    </select>
)
