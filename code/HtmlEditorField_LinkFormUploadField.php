<?php

class HtmlEditorField_LinkFormUploadField extends Extension {

	/**
	 * @param Form $form
	 */
	public function updateLinkForm($form) {
		Requirements::javascript(HTMLEDITORUPLOADFIELD_BASE . '/javascript/htmleditoruploadfield.js');

		$form->Fields()->removeByName('file');

		// Check for SelectUploadField
		if (class_exists('SelectUploadField')) {
  		$fileField = SelectUploadField::create('file', _t('HtmlEditorField.FILE', 'File'));
		} else {
  		$fileField = UploadField::create('file', _t('HtmlEditorField.FILE', 'File'));
		}

		$fileField->setAllowedMaxFileNumber(1);
		$fileField->setForm($form);

		$form->Fields()->insertAfter($fileField, 'email');

		return $form;
	}

}
