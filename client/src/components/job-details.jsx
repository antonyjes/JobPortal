export const JobDetails = ({ jobData }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 m-2 gap-2">
      <div className="text-2xl font-semibold mb-4 text-center">{jobData.title}</div>
      <div className="text-gray-700 text-lg mb-4" dangerouslySetInnerHTML={{__html: jobData.description}}></div>
      <div className="flex items-center mb-4">
        <span className="text-lg font-semibold mr-2">Localización:</span>
        <span>{jobData.location}</span>
      </div>
      <div className="flex items-center mb-4">
        <span className="text-lg font-semibold mr-2">Categoría:</span>
        <span>{jobData.category}</span>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Requerimientos:</h3>
        <ul className="list-disc list-inside">
            {
                jobData.requirements?.length >= 1 && jobData.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                ))
            }
        </ul>
      </div>
      <div className="flex items-center mb-4">
        <span className="text-lg font-semibold mr-2">Tipo de Trabajo:</span>
        <span>{jobData.jobType}</span>
      </div>
      <div className="flex items-center">
        <span className="text-lg font-semibold mr-2">Salario:</span>
        <span>{jobData.salary}</span>
      </div>
    </div>
  );
};
