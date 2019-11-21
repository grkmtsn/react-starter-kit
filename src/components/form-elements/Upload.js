import React from 'react';
import PropTypes from 'prop-types';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { FormGroup, Label, ValidationError, RequiredStar } from './helpers';

registerPlugin(FilePondPluginFileValidateSize);
registerPlugin(FilePondPluginFileValidateType);
registerPlugin(FilePondPluginImagePreview);

const Upload = (props) => {
  const {
    id,
    name,
    label,
    allowMultiple,
    maxFiles,
    instantUpload,
    maxFileSize,
    acceptedFileTypes,
    serverConfig,
    upload,
    requiredStar,
    form,
    field
  } = props;
  const errors = form && form.errors;
  const setFieldValue = form && form.setFieldValue;
  const fieldName = field && field.name;


  return (
    <FormGroup>
      <Label htmlFor={id || fieldName}>{label} {requiredStar && <RequiredStar>*</RequiredStar>} </Label>
      <FilePond
        {...field}
        id={id || fieldName}
        name={fieldName || name}
        className={setFieldValue ? 'upload-field' : ''}
        allowMultiple={allowMultiple}
        maxFiles={maxFiles}
        instantUpload={instantUpload}
        maxFileSize={`${maxFileSize.toString()}KB`}
        acceptedFileTypes={acceptedFileTypes}
        server={serverConfig}
        upload={upload}
        onupdatefiles={files => {
          if (setFieldValue) {
            if (!allowMultiple) {
              if (files.length > 0) {
                const { file } = files[0];
                setFieldValue(fieldName, file);
              } else {
                setFieldValue(fieldName, undefined);
              }
            } else if (files.length > 0) {
              const fileValues = files.map(file => file.file);
              setFieldValue(fieldName, fileValues);
            } else {
              setFieldValue(fieldName, undefined);
            }
          }
        }}
        labelIdle="Dosyalarınızı buraya sürükleyin ya da <span class='filepond--label-action'> Seçin </span>"
        label="Geçersiz dosya bulundu"
        labelFileWaitingForSize="Boyut bilgisi bekleniyor"
        labelFileSizeNotAvailable="Geçersiz Boyut"
        labelFileLoading="Yükleniyor"
        labelFileLoadError="Bir hata oluştu"
        labelFileProcessing="Yükleniyor"
        labelFileProcessingComplete="Yükleme Başarılı"
        labelFileProcessingAborted="Yükleme iptal edildi"
        labelFileProcessingError="Yükleme sırasında bir hata oluştu"
        labelTapToCancel="İptal Et"
        labelTapToRetry="Yeniden Dene"
        labelTapToUndo="Geri Al"
        labelButtonRemoveItem="Sil"
        labelButtonAbortItemLoad="İptal Et"
        labelButtonRetryItemLoad="Yeniden Dene"
        labelButtonAbortItemProcessing="İptal Et"
        labelButtonUndoItemProcessing="Geri Al"
        labelButtonRetryItemProcessing="Yeniden Dene"
        labelButtonProcessItem="Yükle"
        labelMaxFileSizeExceeded="Dosya boyutu çok büyük"
        labelMaxFileSize="Maksimum dosya boyutu {filesize}"
        labelFileTypeNotAllowed="Desteklenmeyen Dosya Tipi"
        fileValidateTypeLabelExpectedTypes="{allButLastType} ya da {lastType}"
      />
      {form && errors[fieldName] ? (
        <ValidationError>
          {errors[fieldName]}
        </ValidationError>
      ) : null}
    </FormGroup>
  )
}

Upload.defaultProps = {
  allowMultiple: false,
  instantUpload: false,
  maxFiles: 1,
  maxFileSize: '1000KB',
  serverConfig: {}
}

Upload.propTypes = {
  id: PropTypes.string.isRequired,
  allowMultiple: PropTypes.bool,
  instantUpload: PropTypes.bool,
  maxFiles: PropTypes.number,
  maxFileSize: PropTypes.number,
  acceptedFileTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  serverConfig: PropTypes.shape({
    url: PropTypes.string,
    process: PropTypes.shape({
      url: PropTypes.string,
      method: PropTypes.string,
      headers: PropTypes.objectOf(PropTypes.any),
      ondata: PropTypes.func,
    })
  }),
}

export { Upload };