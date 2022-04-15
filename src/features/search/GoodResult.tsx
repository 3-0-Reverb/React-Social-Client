import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { reverbClientWithAuth } from "../../remote/reverb-api/reverbClient";
import { Profile } from '../profile/profile';

export default function GoodResult({ results }: any) {
  const [users, setUsers] = useState<any[]>([]);

  const followUser = async (key: string) => {
    await reverbClientWithAuth.put(`/api/user/follow-user/${key}`);
  }

  useEffect(() => { 
    const createUsers = async () => {
      const usersArr: any[] = results;

      for (let i = 0; i < usersArr.length; i++) {
        const resp = await reverbClientWithAuth.get(`/api/profile/getByAuthor/${usersArr[i].key}`);
        usersArr[i].profile = resp.data as Profile;
      }

      console.log(usersArr);
      setUsers(usersArr.slice(0, 9));
    };

    createUsers();
  }, [results]);

  return (
    <>
      {users && users.map((user: any) => (
        <div>
          <NavLink
            className='search-result'
            to={"/user_profile/" + user.profile.id}
            key={user.profile.id}
          >
            <img className='profile-pic-mini' src={user.profile.profile_img}/>
            {user.profile.first_name}&nbsp;&nbsp;
            {user.label}
          </NavLink>
          <button type='button' className="follow-btn" onClick={() => {followUser(user.key)}}>
            FOLLOW
          </button>
          <br key={user.profile.id + "1"}/>
        </div>)
      )}
    </>
  );
}
