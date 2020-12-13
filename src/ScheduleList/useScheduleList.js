import {useDispatch, useSelector} from "react-redux";
import {getSchedules} from "../App/mainReducer"
import {actionSetActiveSchedule} from "../App/actions";

const useScheduleList = () => {
  const dispatch = useDispatch()
  const schedules = useSelector(getSchedules);
  const onClickSchedule = (schedule) => () => dispatch(actionSetActiveSchedule({ body: schedule }))

  return {
    data: schedules,
    onClickSchedule
  }
}

export default useScheduleList;