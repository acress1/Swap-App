import { useState } from "react";
import { toast } from "react-toastify";
import InlineFormHead from "./InlineFormHead";
import InlineFormBody from "./InlineFormBody";
import LinkedButtons from "./LinkedButtons";
import postSwapData from "utils/postSwapData";
import isOutdated from "utils/isOutdated";
import { shiftsItem } from "types";
import 'styles/InlineForm.scss';

const InlineForm = ({ BASEURL, todayDate }: {
  BASEURL: string,
  todayDate: Date
}) => {

  const [shifts, setShifts] = useState<shiftsItem[]>(
    [
      {
        isOvernight: false,
        Date: '',
        Outbound: undefined,
        Inbound: undefined,
        Position: '',
        Early: false,
        Late: false,
        LTA: false,
        DO: false
      }
    ]
  );

  const handleChange = (index: number, fieldName: keyof shiftsItem, fieldValue: string | boolean) => {
    const updatedShifts: any = [...shifts];
    updatedShifts[index][fieldName] = fieldValue;
    setShifts(updatedShifts);
  };

  const addShift = () => {
    const newShifts: any = [
      ...shifts,
      {
        isOvernight: false,
        Date: '',
        Outbound: '',
        Inbound: '',
        Position: '',
        Early: false,
        Late: false,
        LTA: false,
        DO: false
      }
    ];
    setShifts(newShifts)
  };

  const deleteShift = (index: number) => {
    const updatedShifts = [...shifts];
    updatedShifts.splice(index, 1);
    setShifts(updatedShifts);
  };

  const ovSwitch = (index: number) => {
    const updatedShifts = [...shifts];
    updatedShifts[index].isOvernight = !updatedShifts[index].isOvernight;
    setShifts(updatedShifts)
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isAnyOutdated = shifts.some(shift => shift.Date && isOutdated(todayDate, new Date(shift.Date)));

    isAnyOutdated ?
      toast.error('Oops... You can\'t submit an outdated swap 🤓')
      : postSwapData({ BASEURL, shifts, event });
  };

  return (
    <>
      <div className="inlineForm">
        <form onSubmit={handleSubmit}>
          <input
            name="Email"
            type="email"
            placeholder="Email"
            style={{ marginBottom: '4px' }}
          />
          <div className="overflow">
            <table>
              <InlineFormHead />
              <InlineFormBody
                changeHandlers={{ shifts, handleChange, addShift, deleteShift, ovSwitch }}
              />
            </table>
          </div>
          <button
            className="submit-button"
            type="submit"
          >Submit</button>
        </form>
        <LinkedButtons />
      </div>
    </>
  )
};

export default InlineForm;