import instance from './index';
export const postReminder = async (reminder) =>{
    const response = await instance.post(
        'reminder',
        JSON.stringify(reminder),
        {
            headers: {
                "Content-Type": "application/json",
            }
        }
    );
    return response.data;
}
