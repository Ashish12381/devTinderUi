import { useState } from "react";
import UserCards from "../../ReusableComponents/UserCards/UserCards";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../../../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "male");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState(user.skills?.join(", ") || "");
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const handleSaveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
          about,
          skills: skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),
        },
        { withCredentials: true },
      );
      console.log(res);
      dispatch(addUser(res?.data?.data));

      setError("");
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (err) {
      setError(err.response?.data || err.message);

      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <>
      {showSuccess && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success">
            <span>🎉 Profile updated successfully</span>
          </div>
        </div>
      )}

      {error && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        </div>
      )}
      <div className="min-h-screen bg-base-200 py-10 px-5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">
          {/* LEFT SECTION */}
          <div className="card bg-base-100 shadow-2xl">
            <div className="card-body">
              <h2 className="card-title text-3xl mb-5">Edit Profile</h2>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="input input-bordered w-full"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Last Name"
                  className="input input-bordered w-full"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />

                <input
                  type="number"
                  placeholder="Age"
                  className="input input-bordered w-full"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                />

                <select
                  className="select select-bordered w-full"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option>male</option>
                  <option>female</option>
                  <option>other</option>
                </select>

                <input
                  type="text"
                  placeholder="Photo URL"
                  className="input input-bordered w-full"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />

                <textarea
                  className="textarea textarea-bordered h-32"
                  placeholder="About"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Skills separated by comma"
                  className="input input-bordered w-full"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />

                <button
                  className="btn btn-primary w-full"
                  onClick={handleSaveProfile}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex justify-center items-start">
            <UserCards
              user={{
                firstName,
                lastName,
                age,
                gender,
                photoUrl,
                about,
                skills: skills.split(",").map((skill) => skill.trim()),
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
