import { Button, Card, CardMedia } from '@material-ui/core';
import React, { Dispatch, useState } from 'react';
import DeleteModal from '../Modal/DeleteModal/DeleteModal';
import ImageModal from './ImageModal/ImageModal';
import { useStyles } from './imageUploaderStyles';

interface ImageUploaderProps {
    imagePreviewUrl: any;
    setFile: Dispatch<any>;
    setImagePreviewUrl: Dispatch<any>;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
    imagePreviewUrl,
    setFile,
    setImagePreviewUrl,
}) => {
    const classes = useStyles();

    const [isOpenImageModal, setIsOpenImageModal] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    // Открыть окно картинки
    const openImageModalHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsOpenImageModal(true);
    };
    // Закрыть окно картинки
    const closeImageModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenImageModal(false);
    };

    // Открыть окно удаления
    const openDeleteModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenDeleteModal(true);
    };

    // Закрыть окно удаления
    const closeDeleteModalHandler = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        setIsOpenDeleteModal(false);
    };

    // Обработчик инпута картинки
    const imageChangeHandler = (event: any) => {
        const temp = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function (event) {
            // The file's text will be printed here
            if (event.target) {
                console.log(event.target.result);
                setFile(temp);
                setImagePreviewUrl(event.target.result);
            } else {
                console.log('null blyat');
            }
        };

        reader.readAsDataURL(temp);
    };

    // Удалить фото
    const deletePhotoHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setFile('');
        setImagePreviewUrl('');
        setIsOpenDeleteModal(false);
    };

    return (
        <>
            <Button
                className={classes.button}
                variant="contained"
                component="label"
                color="primary"
            >
                Загрузить фото
                <input
                    type="file"
                    hidden
                    onChange={(e) => imageChangeHandler(e)}
                />
            </Button>
            {imagePreviewUrl && (
                <>
                    <Card>
                        <CardMedia
                            className={classes.image}
                            image={imagePreviewUrl}
                            title="Ваше фото"
                            onClick={openImageModalHandler}
                        />
                    </Card>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={openDeleteModalHandler}
                    >
                        Удалить фото
                    </Button>
                </>
            )}

            {isOpenImageModal && (
                <ImageModal
                    image={imagePreviewUrl}
                    isOpen={isOpenImageModal}
                    closeModal={closeImageModalHandler}
                />
            )}

            {isOpenDeleteModal && (
                <DeleteModal
                    header="Удаление фото"
                    isOpen={isOpenDeleteModal}
                    text="ваше фото"
                    closeModal={closeDeleteModalHandler}
                    apply={deletePhotoHandler}
                />
            )}
        </>
    );
};

export default ImageUploader;
