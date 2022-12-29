import React, {useState} from 'react'
import {useNavigate} from "react-router-dom"
import {ethers} from "ethers";

import {money} from "../assets"
import { CustomButton, Loader } from '../components';
import { checkIfImage } from '../utils';

import {FormField} from '../components';

import {useStateContext} from "../context"


const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { createCampaign } = useStateContext();

  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: ''
  });

  const handleFieldChange = (fieldName, e) => {
    setForm({...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    checkIfImage(form.image, async (exists) => {
      if(exists) {
        setIsLoading(true);
        await createCampaign({...form, target: ethers.utils.parseUnits(form.target, 18)})
        setIsLoading(false);
        navigate("/");
      }else{
        alert('Provide valid Image URL');
        setForm({...form, image: ''});
      }
    })

    console.log(form)
  };
  
  return (
    <div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4'>
      {isLoading && <Loader />}
      <div className='flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]'>
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Start a Campaign</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className='flex flex-wrap gap-[40px]'>
          <FormField 
            LabelName="Your Name *"
            placeHolder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFieldChange('name', e)}
          />
          <FormField 
            LabelName="Campaign Title *"
            placeHolder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFieldChange('title', e)}
          />
        </div>
        <FormField 
            LabelName="Story *"
            placeHolder="Write your story"
            isTextArea
            value={form.description}
            handleChange={(e) => handleFieldChange('description', e)}
        />
      
        <div className='w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]'>
          <img src={money} alt="money" className='w-[40px] h-[40px] object-contain' />
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">You will get 100% of the raised amount</h4>
        </div>

        <div className='flex flex-wrap gap-[40px]'>
          <FormField 
            LabelName="Goal *"
            placeHolder="ETH 0.50"
            inputType="number"
            value={form.target}
            handleChange={(e) => handleFieldChange('target', e)}
          />
          <FormField 
            LabelName="End Date *"
            placeHolder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFieldChange('deadline', e)}
          />
          </div>
          <FormField 
            LabelName="Campaign Image *"
            placeHolder="Place image URL of your campaign"
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFieldChange('image', e)}
          />

          <div className="flex justify-center items-center mt-[40px]">
          <CustomButton 
            btnType="submit"
            title="Submit new Campaign"
            styles="bg-[#1dc071]"
          />
        </div>
        


        
      </form>

    </div>
  )
}

export default CreateCampaign