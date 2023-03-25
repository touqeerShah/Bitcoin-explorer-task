echo "Build Image of Services"
sleep 3
BACKEND_IMAGE_NAME="blockchain-ex-backend"
UI_IMAGE_NAME="blockchain-ex-ui"

echo "Start Build Backend Image"
pushd ./backend/    
        echo "Dockerfile Path = ./backend/Dockerfile"
        docker build -t blockchain-ex/$BACKEND_IMAGE_NAME .
popd
echo "Successfully Build Backend Image"
sleep 2

echo "Start Build UI Image"
pushd ./ui/
        echo "Dockerfile Path = ./ui/Dockerfile"
        docker build -t blockchain-ex/$UI_IMAGE_NAME .
popd
echo "Successfully Build UI Image"
