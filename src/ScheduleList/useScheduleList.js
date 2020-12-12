import {useSelector} from "react-redux";
import {getSchedules} from "../App/mainReducer"

const useScheduleList = () => {
  const schedules = useSelector(getSchedules);
  return {
    data: schedules
  }
}

export default useScheduleList;