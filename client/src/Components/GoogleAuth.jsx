import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { app } from '../Firebase';

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { signInSuccess } from '../redux/user/userSlice';

const GoogleAuth = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = async () => {

        try {

            const auth = getAuth(app);
            const googleAuth = new GoogleAuthProvider(auth);

            const googleUser = await signInWithPopup(auth, googleAuth);

            const res = await fetch("/api/auth/google", {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify({
                    name: googleUser.user.displayName,
                    email: googleUser.user.email,
                    avatar: googleUser.user.photoURL
                })
            });

            const data = await res.json();

            dispatch(signInSuccess(data));

            navigate("/");

        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <button
            type='button'
            onClick={handleClick}
            className={`bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 w-full uppercase`}>
            continue with google
        </button>
    )
}

export default GoogleAuth;