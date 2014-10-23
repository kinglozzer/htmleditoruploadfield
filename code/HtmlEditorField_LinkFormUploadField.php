<?php

class HtmlEditorField_LinkFormUploadField extends Extension {

	/**
	 * @param Form $form
	 */
	public function updateLinkForm($form) {
		Requirements::javascript(HTMLEDITORUPLOADFIELD_BASE . '/javascript/htmleditoruploadfield.js');

		$form->Fields()->removeByName('file');

		$fileField = UploadField::create('file', _t('HtmlEditorField.FILE', 'File'))
			->setAllowedMaxFileNumber(1)
			->setForm($form);

		$form->Fields()->insertAfter($fileField, 'email');

		return $form;
	}

}
