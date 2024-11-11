
import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

const AddTask = () => {

    const [editMode, setEditMode] = useState(false)

    const handleCancel = () => {
        setEditMode(false);
        setSelectedDate("Select Due Date")
        setSelectedTime("Select Due Time")
    };

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false)
    const [selectedDate, setSelectedDate] = useState("Select Due Date")
    const [selectedTime, setSelectedTime] = useState("Select Due Time")

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleDateConfirm = (date) => {
        const d = new Date(date)
        const x = d.toISOString().split('T')
        const x1 = x[0].split('-')
        setSelectedDate(x1[2] + "/" + x1[1] + "/" + x1[0])
        hideDatePicker();
    };

    const handleTimeConfirm = (time) => {
        const t = new Date(time)
        const x = t.toLocaleTimeString()
        setSelectedTime(x)
        hideTimePicker();
    };

    return (
        <View className="flex-col mx-6 mb-6 space-y-4">
            {editMode ? (
                <>
                    <View className="p-6 mb-2 rounded-lg bg-slate-200">
                        <Text className="tracking-wider">Enter Task Details:</Text>
                        <TextInput
                            // placeholder="Enter Task Details"
                            className="w-full px-4 py-2 my-4 border border-gray-500 rounded-lg"
                        />
                        <TouchableOpacity
                            onPress={() => showDatePicker(true)}
                            className="py-3 mt-2 mb-4 border border-gray-500 rounded-lg"
                        >
                            <Text className="pl-4 tracking-wider text-gray-600">{selectedDate}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => showTimePicker(true)}
                            className="py-3 mt-2 mb-4 border border-gray-500 rounded-lg"
                        >
                            <Text className="pl-4 tracking-wider text-gray-600">{selectedTime}</Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleDateConfirm}
                            onCancel={hideDatePicker}
                        />
                        <DateTimePickerModal
                            isVisible={isTimePickerVisible}
                            mode="time"
                            onConfirm={handleTimeConfirm}
                            onCancel={hideTimePicker}
                        />
                        <TouchableOpacity
                            // onPress={}
                            className="py-3 mt-2 border rounded-lg border-primary"
                        >
                            <Text className="tracking-wider text-center text-primary">Upload File</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={handleCancel}>
                        <Text className="py-4 tracking-widest text-center text-white rounded-lg bg-slate-600 font-rmedium">Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    // onPress={handleSave}
                    >
                        <Text className="py-4 tracking-widest text-center text-white rounded-lg bg-primary font-rmedium">
                            {/* {isSaving ? "Saving..." : "Save"} */}
                            Add Task
                        </Text>
                    </TouchableOpacity>
                </>
            ) : (
                <TouchableOpacity
                    onPress={() => setEditMode(true)}
                >
                    <Text className="py-4 tracking-widest text-center text-white rounded-lg bg-primary font-rmedium">Add Task</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

export default AddTask