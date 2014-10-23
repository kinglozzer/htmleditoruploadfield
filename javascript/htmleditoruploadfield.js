var ss = ss || {};

(function($) {
	
	$.entwine('ss', function($) {
		$('form.htmleditorfield-linkform').entwine({
			redraw: function() {
				this._super();
				this.resetFileField();
			},
			getLinkAttributes: function() {
				var href, target = null, anchor = this.find(':input[name=Anchor]').val();
				
				// Determine target
				if(this.find(':input[name=TargetBlank]').is(':checked')) target = '_blank';
				
				// All other attributes
				if(this.find(':input[name=LinkType]:checked').val() == 'file') {
					return {
						href : '[file_link,id=' + this.find('.ss-uploadfield .ss-uploadfield-item').attr('data-fileid') + ']',
						target : target,
						title : this.find(':input[name=Description]').val()
					};
				}

				return this._super();
			},
			insertLink: function() {
				this.modifySelection(function(ed){
					ed.insertLink(this.getLinkAttributes());
				});
			},
			removeLink: function() {
				this.resetFileField();
				this._super();
			},
			resetFileField: function() {
				// If there's an attached item, remove it
				var fileField = this.find('#file'),
					fileUpload = fileField.data('fileupload'),
					currentItem = fileField.find('.ss-uploadfield-item[data-fileid]');

				if(currentItem.length) {
					fileUpload._trigger('destroy', null, {context: currentItem});
				}
			},
			updateFromEditor: function() {
				this._super();

				var htmlTagPattern = /<\S[^><]*>/g, fieldName, data = this.getCurrentLink();
				
				if(data) {
					for(fieldName in data) {
						var el = this.find(':input[name=' + fieldName + ']'), selected = data[fieldName];
						// Remove html tags in the selected text that occurs on IE browsers
						if(typeof(selected) == 'string') selected = selected.replace(htmlTagPattern, ''); 

						if(fieldName == 'file') {
							// Can't rely on fieldName, as UploadFields have different naming convention
							el = $('#' + fieldName);

							// We have to wait for the UploadField to initialise
							(function attach(el, selected) {
								if( ! el.getConfig()) {
									setTimeout(function(){ attach(el, selected); }, 50);
								} else {
									el.attachFiles([selected]);
								}
							})(el, selected);
						}
					}
				}
			}
		});
	});

})(jQuery);
