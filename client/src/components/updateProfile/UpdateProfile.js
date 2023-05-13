import React, { useEffect, useState } from 'react'
import './UpdateProfile.scss'
import userImg from '../../assets/user.png'
import { useSelector, useDispatch } from 'react-redux';
import { setLoading } from '../../redux/slices/appConfigSlice';

function UpdateProfile() {
    const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [userImg, setUserImg] = useState('');
    const dispatch = useDispatch();
    useEffect(()=> {
        setName(myProfile?.name || '');
        setBio(myProfile?.bio || ''); 
        setUserImg(myProfile?.avatar.url || '');
    }, [myProfile]);

    function handleImageChange(e) {
        const file = e.target.files[0]; 
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            if(fileReader.readyState === fileReader.DONE) {
                setUserImg(fileReader.result)
                console.log('img data', fileReader.result);
            }
        }
    }
    function handleSubmit(e) {
        e.preventDefault();
        try {
            dispatch(setLoading(true)); 
            const 
        } catch (error) {
            
        }
        finally{
            dispatch(setLoading(false)); 
        }
    }
  return (
    <div className='UpdateProfile'>
        <div className="container">
            <div className="left-part">
                <div className="input-user-img">
                    <label htmlFor="inputImg" className='labelImg'>User Image</label>
                    <input className="inputImg" id="inputImg" type="file" accept='image/*' onChange={handleImageChange}/>
                </div>
            </div>
            <div className="right-part">
                <form onSubmit={handleSubmit}>
                    <input value={name} type="text" placeholder='Your Name' onChange={(e) => setName(e.target.value)}/>
                    <input value={bio} type="text" placeholder='Your bio' onChange={(e) => setBio(e.target.value)}/>
                    <input type="submit" className='btn-primary' onClick={handleSubmit}/>
                </form>

                <button className='delete-account btn-primary'>Delete Account</button>
            </div>
        </div>
    </div>
  )
}

export default UpdateProfile