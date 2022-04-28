const Alert = ({ alert }) => {
  return (
    <div className={`${alert.error ? 'from-red-400 to-red-600' : 'from-sky-400 to-sky-600'} bg-gradient-to-b p-3 rounded-xl uppercase text-center text-white font-bold text-sm w-4/5 max-w-sm mx-auto`}>
      {alert.message}
    </div>
  );
}

export default Alert;