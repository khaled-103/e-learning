<template>
  <div>
    <ckeditor
      :editor="editor"
      :value="value"
      :config="config"
      :tagName="tagName"
      :disabled="disabled"
      @input="event => $emit('input', event)"
    />
  </div>
</template>
<script>
const server = "http://127.0.0.1:8000/api/store/description-images";

import axios from "axios";

class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(file => {
      const formData = new FormData();
      formData.append("upload", file);

      return axios
        .post("http://127.0.0.1:8000/api/store/description-images", formData)
        .then(response => {
          return {
            default: response.data.url
          };
        })
        .catch(error => {
          throw new Error(`Couldn't upload file: ${file.name}.`);
        });
    });
  }

  abort() {
    // Implement logic to abort the file upload.
  }
  _initRequest() {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };

    this.xhr = axios.post(
      "http://127.0.0.1:8000/api/store/description-images",
      config
    );
  }

  _sendRequest(file) {
    const formData = new FormData();
    formData.append("upload", file);

    this.xhr
      .then(response => {
        this.xhr = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  }
}

let ClassicEditor;
let CKEditor;

if (process.client) {
  ClassicEditor = require("@ckeditor/ckeditor5-build-classic");
  CKEditor = require("@ckeditor/ckeditor5-vue2");
} else {
  CKEditor = { component: { template: "<div></div>" } };
}

export default {
  components: {
    ckeditor: CKEditor.component
  },
  props: {
    value: {
      type: String,
      required: false
    },
    tagName: {
      type: String,
      required: false,
      default: "div"
    },
    disabled: {
      type: Boolean,
      required: false
    },
    uploadUrl: {
      type: String,
      required: false
    }
    // config: {
    //   type: Object,
    //   required: false,
    //   default: function() {}
    // }
  },
  data() {
    return {
      editor: ClassicEditor,
      config: {
        toolbar: [
          "heading",
          "|",
          "bold",
          "italic",
          "link",
          "bulletedList",
          "numberedList",
          "|",
          "insertTable",
          "|",
          "imageUpload",
          "mediaEmbed",
          "|",
          "undo",
          "redo"
        ],
        table: {
          toolbar: ["tableColumn", "tableRow", "mergeTableCells"]
        },
        extraPlugins: [this.uploader]
      }
    };
  },
  methods: {
    uploader(editor) {
      editor.plugins.get("FileRepository").createUploadAdapter = loader => {
        return new MyUploadAdapter(loader);
      };
    }
  }
};
</script>
<style>
.ck-content {
  min-height: 150px !important;
}

</style>