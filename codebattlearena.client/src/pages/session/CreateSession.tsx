import SessionForm from "@/components/forms/SessionForm";


const CreateSession: React.FC = () => {
  return (
      <div className="glow-box bg-zinc-900 text-white p-6">
          <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                  <h1 className="text-4xl font-bold text-green-400 font-mono">
                      Create Session
                  </h1>
              </div>
              <SessionForm submitLabel="Created"></SessionForm>
          </div>
      </div>
  );
}

export default CreateSession;