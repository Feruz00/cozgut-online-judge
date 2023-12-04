import Button from "./Button";


function ConfirmDelete({ resourceName, onConfirm, disabled , onCloseModal, id}) {
  const handleClick = ()=>{
    onConfirm( (id), {
      onSuccess: ()=>{
        onCloseModal?.()
      }
    } )
  }
  return (
    <div className="w-[40rem] flex flex-col gap-5">
      <h1 className="text-xl font-medium"> {resourceName}</h1>
      <p className="text-color-grey-500 mb-5">
        Siz hakykatdanam pozmakçymysyňyz?
      </p>

      <div className="flex justify-end gap-5">
        <Button secondary disabled={disabled} onClick={onCloseModal} className="px-10 rounded-sm py-2" >
          Cancel
        </Button>
        <Button danger disabled={disabled} onClick={handleClick} className="px-10 rounded-sm py-2">
          Poz
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
