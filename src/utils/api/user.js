import Env from 'react-native-config';

export const updateProfile = async (user) => {
    try {
        const updateUserCall = await fetch(`${Env.API_URL}/api/user/update-profile/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name: user.first_name,
                last_name: user.last_name,
                username: user.username,
                email: user.email,
                phone_number: user.phone_number,
            }),
        });
        const updateUserResponse = await updateUserCall.json();
        return updateUserResponse;
    } catch (error) {
        console.log(error);
    }
};
