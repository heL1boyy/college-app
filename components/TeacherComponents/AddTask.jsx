
import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Modal } from 'react-native'
import { Calendar } from 'react-native-calendars'

const AddTask = () => {

    const [editMode, setEditMode] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const handleCancel = () => {
        setEditMode(false);
    };

    return (
        <View className="flex-col mx-6 mb-6 space-y-4">
            {editMode ? (
                <>
                    <View className="p-6 mb-2 rounded-lg bg-slate-200">
                        <Text className="tracking-wider">Enter Details:</Text>
                        <TextInput
                            // placeholder='Enter Title'
                            className="w-full px-4 py-2 my-4 border border-gray-500 rounded-lg"
                        />
                        <TouchableOpacity
                            onPress={() => setShowModal(true)}
                            className="py-3 mt-2 mb-4 border rounded-lg border-primary"
                        >
                            <Text className="tracking-wider text-center text-primary">Select Due Date</Text>
                        </TouchableOpacity>
                        <Modal visible={showModal} animationType='fade'>
                            <Calendar
                                style={{
                                    borderRadius: 6,
                                    elevation: 10,
                                    margin: 40
                                }}
                                hideExtraDays={true}
                                onDayPress={date => {
                                    setShowModal(false)
                                    console.log(date)
                                }}
                            />
                        </Modal>
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