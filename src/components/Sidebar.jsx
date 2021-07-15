import React, { useState } from 'react';
//import Select from 'react-select';
import SelectFilter from './Filter';
import DatePicker from "./DatePicker";

/**
 * environment var to define any value for filter
 * (select all options)
 */
const WILDCARD = `${process.env.REACT_APP_ANY_FILTER_VALUE}`;

function Sidebar({ onChange, filterByTargetDate, selectedLocation, onSelectLocationUpdate }) {

  const [selectedPriority, setSelectPriority] = useState({ value: WILDCARD, label: "All" });
  const [selectedStatus, setSelectStatus] = useState({ value: WILDCARD, label: "All" });
  const [requireByDate, setRequireByDate] = useState(new Date());
  const [filterStatus, setFilterStatus] = useState({ error: null });

  // Cross reference the actual list value with the option list value
  const getCurrentLocationStatusOpt = (status) => {
    return statusOptions.filter(option => option.value === status);
  }

  const priorityOptions = [
    { value: WILDCARD, label: "All" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" }, 
  ];
   
  const statusOptions = [
    { value: WILDCARD, label: "All" },
    { value: "in_progress", label: "In Progress" },
    { value: "assigned", label: "Assigned" },
    { value: "unassigned", label: "Not Assigned" },
    { value: "completed", label: "Completed" }, 
  ];
  const editOptions = statusOptions.slice(1);

  // date filter reset on picking a new status or priority
  const onChangePriority = (selectPriority) => { 
    setSelectPriority(selectPriority);
    setFilterStatus(onChange({ priority: selectPriority.value, status: selectedStatus.value }));
    setRequireByDate(new Date());
  }

  const onChangeStatus = (selectStatus) => {
    setSelectStatus(selectStatus);
    setFilterStatus(onChange({ priority: selectedPriority.value, status: selectStatus.value }));
    setRequireByDate(new Date());
  }

  const onChangeDate = (targetDate) => {
    setRequireByDate(targetDate);
    setFilterStatus(filterByTargetDate(targetDate));
  }

  const onEditStatusOption = (selectedOption) => {
    console.log(JSON.stringify(selectedLocation));
    // update the selected location status field. Could use react-query
    // to mutate via a POST request to a remote API and update db
    // Currently this uses App to update its internal location list state,
    // but not the .json file where this data is loaded.
    selectedLocation.status = selectedOption.value;
    onSelectLocationUpdate(selectedLocation);
  }

  return (
    <div className="container-filters">
      
      <h1>Job Filters</h1>
      {filterStatus.error !== null &&      
        <div className="container-error">No results were found for the current filter(s)</div>
      }

      <div className="container-form">
        <p>Updating Job Status or Priority will reset the date filter to today.</p>
        <label htmlFor="statusFilter">Job Status</label>
        <SelectFilter 
          id="statusFilter"
          value={selectedStatus}
          options={statusOptions}
          onChange={onChangeStatus}
        />

        <label htmlFor="priorityFilter">Priority</label>
        <SelectFilter
          id="priorityFilter"
          value={selectedPriority}
          options={priorityOptions}
          onChange={onChangePriority}
        />

        <hr />
        <label htmlFor="completionDates">Uncompleted Jobs By Date</label>
        <DatePicker
          value={requireByDate}
          onChange={(newDate) => onChangeDate(newDate)}
        />

        {(selectedLocation !== null) && (
          <>
            <hr />
            <h3>Selected Job</h3>
            <form>
              <section className="container-form">
                <div className="container-form--pair">
                  <label
                    htmlFor="id" 
                    aria-label="Id"
                    aria-required="false"
                  >Job ID:</label>
                  <input
                    type="text" 
                    name="id" 
                    readOnly 
                    value={selectedLocation.id} 
                  />
                </div>
                <div className="container-form--pair">
                  <label 
                    htmlFor="priority" 
                    aria-label="Priority"
                    aria-required="false"
                  >Priority:</label>
                  <input 
                    type="text" 
                    name="priority" 
                    readOnly 
                    value={selectedLocation.priority}
                  />
                </div>

                <hr />
                <label 
                  htmlFor='editFilter'                   aria-label="Change Status"
                  aria-required="false"
                >Change Status:</label>
                <SelectFilter 
                  id="editFilter"
                  value={getCurrentLocationStatusOpt(selectedLocation.status)}
                  defaultValue={getCurrentLocationStatusOpt(selectedLocation.status)}
                  options={editOptions}
                />

                <button onClick={onEditStatusOption}>Update Job Status</button>
                <hr />
                {JSON.stringify(selectedLocation, null, 2)}
              </section>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
