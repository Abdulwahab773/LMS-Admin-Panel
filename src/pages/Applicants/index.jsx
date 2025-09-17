import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { useState } from 'react';

function ApplicantsPage() {
  const { uid } = useParams(); 

  let [dynamicData  ,setDynamicData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
      
        const q = query( collection(db, "applicants"), where("useruid", "==", uid) );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            console.log("Applicant Data:",doc.data());
            setDynamicData(doc.data())
          });

        
        
        } else {
          console.log("No applicant found with this useruid");
        }
      } catch (error) {
        console.error("Error fetching applicant data:", error);
      }
    };

    if (uid) fetchData();
  }, [uid]);



let enrolledStudent = async()=>{

  
  try {
        
    let docRef = await addDoc(collection(db, "Enrolled"), {
      
      
      UserFatherName: dynamicData.UserFatherName,       
      UserAddress: dynamicData.UserAddress,
      UserCity: dynamicData.UserCity,
      UserCNIC: dynamicData.UserCNIC,
      UserCountry: dynamicData.UserCountry,
      UserEmail: dynamicData.UserEmail,
      UserGender: dynamicData.UserGender,
      UserLastQualification: dynamicData.UserLastQualification,
      useruid :dynamicData.useruid,
      userName : dynamicData.UsreName


    });
 console.log(docRef);
 

    const q = query(collection(db, "applicants"), where("useruid", "==", uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      for (const document of querySnapshot.docs) {
        await deleteDoc(doc(db, "applicants", document.id));
        console.log("Applicant deleted with ID:", document.id);
      }
    } else {
      console.log("No applicant found with this useruid:", uid);
    }


  } catch (error) {
    console.error("Error moving applicant:", error);
  }


}

console.log("Dynamic Data:", dynamicData);



  return (
    <div>
      This is an applicant page







<h1>{dynamicData.UserCNIC}</h1>
<h1>{dynamicData.UserAddress}</h1>
<h1>{dynamicData.UserCity}</h1>
<h1>{dynamicData.UserCNIC}</h1>
<h1>{dynamicData.UserCountry}</h1>
<h1>{dynamicData.UserEmail}</h1>
<h1>{dynamicData.UserFatherName}</h1>
<h1>{dynamicData.UserGender}</h1>
<h1>{dynamicData.UserLastQualification}</h1>
<h1>{dynamicData.useruid}</h1>
<h1>{dynamicData.UsreName}</h1>


<br /><br /><br />
 <button onClick={enrolledStudent}>Enrolled</button>















    </div>
  )
}

export default ApplicantsPage






