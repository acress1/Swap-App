import { toast } from "react-toastify";

export const BASEURL = "https://localhost:3000";

export const todayDate = new Date();

export const isOutdated = (day) => {
    todayDate.setHours(0, 0, 0, 0);
    return day < todayDate;
};

export const matchesSearch = ({dataItem, search}) => {

    const searchField = ["Date", "Outbound", "Inbound", "Position", "Early", "Late", "LTA", "DO", "Email", "Sent"];

    if(!search){ 
        return true
    };

    if(search === "Early" || search === "early"){
        return dataItem["Early"] === true
    };

    if(search === "Late" || search === "late"){
        return dataItem["Late"] === true
    };

    return searchField.some(field => 
        dataItem[field] && dataItem[field].toString().toLowerCase().includes(search.toLowerCase())
    );
};

export const postSwapData = ({BASEURL, shifts, e}) => {

    shifts.forEach(shift => {
        const formData = {
          Email: e.target.elements.Email.value,
          Date: shift.Date,
          Outbound: shift.Outbound,
          Inbound: shift.isOvernight ? shift.Inbound + '+1d' : shift.Inbound,
          Position: shift.Position,
          Early: shift.Early,
          Late: shift.Late,
          LTA: shift.LTA,
          DO: shift.DO,
          Note: shift.Note
        };
  
        fetch(`${BASEURL}/formData`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(formData)
          })
        .then(response => {
          if (!response.ok) {
            throw new Error('Form submission failed');
          }
          return response.json()
        })
        .then(data => {
          console.log('Success', data);

          if(shift.Position === "AV" || shift.Position === "Platform")
            {toast.success(`${shift.Position} on ${shift.Date} submitted successfully!`)}
          else
            {toast.success(`${shift.Outbound} - ${shift.Inbound} on ${shift.Date} submitted successfully!`)}
          
          setTimeout( function(){ window.location.reload() }, 5000);
        })
        .catch(error => {
          console.log(error);

          if(shift.Position === "AV" || shift.Position === "Platform")
            {toast.error(`${shift.Position} on ${shift.Date} submission failed`)}
          else
            {toast.error(`${shift.Outbound} - ${shift.Inbound} on ${shift.Date} submission failed`)}
        });
    });
};