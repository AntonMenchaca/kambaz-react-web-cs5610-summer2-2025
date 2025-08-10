import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { Button, FormControl } from "react-bootstrap";
import * as client from "./client";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const [originalProfile, setOriginalProfile] = useState<any>({});
  const [isModified, setIsModified] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const fetchProfile = useCallback(() => {
    if (!currentUser) return navigate("/Kambaz/Account/Signin");
    setProfile(currentUser);
    setOriginalProfile(currentUser);
    setIsModified(false);
  }, [currentUser, navigate]);

  const updateProfile = async () => {
    try {
      const updatedUser = await client.updateUser(profile);
      dispatch(setCurrentUser(updatedUser));
      setOriginalProfile(updatedUser);
      setIsModified(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleProfileChange = (field: string, value: string) => {
    const updatedProfile = { ...profile, [field]: value };
    setProfile(updatedProfile);

    // Check if profile has been modified
    const hasChanges = JSON.stringify(updatedProfile) !== JSON.stringify(originalProfile);
    setIsModified(hasChanges);
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kambaz/Account/Signin");
  };
  useEffect(() => { fetchProfile(); }, [fetchProfile]);
  return (
    <div className="wd-profile-screen">
      <h3>Profile</h3>
      {profile && (
        <div>
          <FormControl value={profile.username || ''} id="wd-username" className="mb-2"
            onChange={(e) => handleProfileChange('username', e.target.value)} />
          <FormControl value={profile.password || ''} id="wd-password" className="mb-2"
            onChange={(e) => handleProfileChange('password', e.target.value)} />
          <FormControl value={profile.firstName || ''} id="wd-firstname" className="mb-2"
            onChange={(e) => handleProfileChange('firstName', e.target.value)} />
          <FormControl value={profile.lastName || ''} id="wd-lastname" className="mb-2"
            onChange={(e) => handleProfileChange('lastName', e.target.value)} />
          <FormControl value={profile.dob || ''} id="wd-dob" className="mb-2"
            onChange={(e) => handleProfileChange('dob', e.target.value)} type="date" />
          <FormControl value={profile.email || ''} id="wd-email" className="mb-2"
            onChange={(e) => handleProfileChange('email', e.target.value)} />
          <select disabled={profile.role === 'USER' || profile.role === 'STUDENT'} value={profile.role || 'USER'} onChange={(e) => handleProfileChange('role', e.target.value)}
            className="form-control mb-2" id="wd-role">
            <option value="USER">User</option>            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>      <option value="STUDENT">Student</option>
          </select>
          <Button
            onClick={updateProfile}
            disabled={!isModified}
            className="wd-update-btn btn btn-primary w-100 mb-2"
            id="wd-update-btn">
            Update Profile
          </Button>
          <Button onClick={signout} className="wd-signout-btn btn btn-danger w-100 mb-2" id="wd-signout-btn">
            Sign out
          </Button>
        </div>
      )}
    </div>);
}