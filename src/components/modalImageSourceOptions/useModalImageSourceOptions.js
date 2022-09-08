import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const useModalImageSourceOptions = ({onSelectNewImage}) => {
  const handlePressImageSourceOption = ({id}) => {
    const options = {
      storageOptions: {
        includeBase64: false,
      },
    };

    const launcherFunctions = [launchCamera, launchImageLibrary];

    launcherFunctions[id](options, selectedImage =>
      onSelectNewImage(selectedImage),
    );
  };

  return {
    handlePressImageSourceOption,
  };
};

export default useModalImageSourceOptions;
