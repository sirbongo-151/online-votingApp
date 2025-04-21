import React, { useState } from 'react';
import { useSendOtpMutation, useVerifyOtpMutation } from '../redux/otiApi';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

const VerifyOTP = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [sendOtp, { isLoading: sending }] = useSendOtpMutation();
  const [verifyOtp, { isLoading: verifying }] = useVerifyOtpMutation();

  const handleSendOtp = async () => {
    setError('');
    if (!email) {
      setError('Email is required');
      return;
    }
    try {
      const res = await sendOtp({  email, code  }).unwrap();
      setOtpSent(true);
      alert(res.message);
    } catch (err) {
      setError(err?.data?.message || 'Error sending OTP');
      console.error("OTP Error:", err);
    }
  };

  const handleVerifyOtp = async () => {
    setError('');
    if (!code) {
      setError('OTP Code is required');
      return;
    }
    try {
      const res = await verifyOtp({ email, otp: code }).unwrap(); // ✅ FIXED key name
      alert(res.message);
      navigate('/voting');
    } catch (err) {
      console.error("OTP Error:", err);
      setError(err?.data?.message || 'Error verifying OTP');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <img
        src="https://cdni.iconscout.com/illustration/premium/thumb/otp-code-to-unlock-illustration-download-in-svg-png-gif-file-formats--password-authentication-security-one-time-text-passcode-pack-cyber-illustrations-3916139.png?f=webp"
        alt="OTP Illustration"
        className="h-60 mx-auto mb-6"
      />
      
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          {otpSent ? 'Enter OTP' : 'Enter Your Email'}
        </h2>
        
        {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}
        
        {!otpSent ? (
          <>
            <input
              type="email"
              placeholder="example@email.com"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:ring focus:ring-blue-300 outline-none placeholder:text-gray-400 text-gray-900 "
            />
            <button
              onClick={handleSendOtp}
              disabled={sending || !email}
              className={`w-full p-2 rounded-lg text-white font-semibold transition ${
                sending || !email
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-500'
              }`}
            >
              {sending ? <Loading/> : 'Send OTP'}
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:ring focus:ring-blue-300 outline-none placeholder:text-gray-400 text-gray-900"
            />
            <button
              onClick={handleVerifyOtp}
              disabled={verifying || !code}
              className={`w-full p-2 rounded-lg text-white font-semibold transition ${
                verifying || !code
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-500'
              }`}
            >
              {verifying ? <Loading/> : 'Verify OTP'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyOTP;
