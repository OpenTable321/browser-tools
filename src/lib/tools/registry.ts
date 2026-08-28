import type { ToolMeta } from "./types";

/**
 * Central Tool Registry — add new tools here.
 *
 * Steps to add a new tool:
 * 1. Create the tool component in src/tools/<slug>/ToolComponent.tsx
 * 2. Register the component mapping in src/lib/tools/tool-components.tsx
 * 3. Add the tool metadata object below
 */
export const toolRegistry: ToolMeta[] = [
  {
    slug: "image-compressor",
    name: "Image Compressor",
    description:
      "Compress JPG, PNG, and WebP images in your browser. Adjust quality and preview results instantly — no uploads.",
    longDescription:
      "Reduce image file size without leaving your browser. This tool uses the HTML Canvas API to re-encode images at your chosen quality level. Your files never leave your device, ensuring complete privacy. Supports JPG, PNG, and WebP formats with real-time file size comparison.",
    category: "image",
    keywords: [
      "image compressor",
      "compress image",
      "reduce image size",
      "jpg compressor",
      "png compressor",
      "webp compressor",
      "image optimizer",
    ],
    icon: "🖼️",
    isClientSide: true,
    featured: true,
    relatedSlugs: ["image-resizer", "jpg-to-webp", "jpg-to-pdf"],
    supportedFormats: ["JPG", "JPEG", "PNG", "WebP"],
    limitations: [
      "Output is limited to JPEG or WebP — PNG output is not supported for compression",
      "Maximum file size: 50 MB",
      "Animated images (GIF, animated WebP) are not supported",
    ],
    faq: [
      {
        question: "What image formats are supported?",
        answer:
          "JPG, PNG, and WebP. You can compress to either JPEG or WebP format. PNG input is supported but will be converted to JPEG or WebP during compression.",
      },
      {
        question: "Is there a file size limit?",
        answer:
          "Yes, images up to 50 MB are supported. This limit exists to prevent browser memory issues during processing.",
      },
      {
        question: "Does compression reduce image quality?",
        answer:
          "Compression re-encodes the image at your chosen quality level. Lower quality produces smaller files but may introduce visible artifacts. For most use cases, 70–85% quality provides a good balance between file size and visual fidelity.",
      },
    ],
  },
  {
    slug: "image-resizer",
    name: "Image Resizer",
    description:
      "Resize images to any dimensions in your browser. Lock aspect ratio, use presets, and export as PNG, JPG, or WebP — no uploads.",
    longDescription:
      "Resize images to exact pixel dimensions without uploading them anywhere. Set custom width and height, lock the aspect ratio to avoid distortion, or pick from common presets like 1920×1080 or 1280×720. Choose your output format (PNG, JPEG, or WebP) and quality level. All processing happens locally via the Canvas API — your images never leave your device.",
    category: "image",
    keywords: [
      "image resizer",
      "resize image",
      "scale image",
      "change image dimensions",
      "image size converter",
      "resize png",
      "resize jpg",
      "resize webp",
    ],
    icon: "📐",
    isClientSide: true,
    featured: true,
    relatedSlugs: ["image-compressor", "jpg-to-png", "jpg-to-pdf"],
    supportedFormats: ["JPG", "JPEG", "PNG", "WebP"],
    limitations: [
      "Maximum file size: 50 MB",
      "Upscaling beyond the original resolution may reduce quality",
      "Animated images are not supported",
    ],
    faq: [
      {
        question: "What output formats are supported?",
        answer:
          "PNG, JPEG, and WebP. PNG is lossless and preserves full quality. JPEG and WebP support adjustable quality levels for smaller file sizes.",
      },
      {
        question: "Can I resize without distorting the image?",
        answer:
          "Yes. The aspect ratio lock is enabled by default. When locked, changing width automatically adjusts height (and vice versa) to maintain the original proportions.",
      },
      {
        question: "What preset sizes are available?",
        answer:
          "Common resolutions like 1920×1080, 1280×720, 800×600, and 640×480 are available as one-click presets. You can also enter custom dimensions manually.",
      },
    ],
  },
  {
    slug: "jpg-to-webp",
    name: "JPG to WebP",
    description:
      "Convert JPG images to WebP format in your browser. Adjust quality and compare file sizes — no uploads, no sign-up.",
    longDescription:
      "Convert JPG and JPEG images to the modern WebP format without uploading them to a server. WebP typically produces smaller files at equivalent visual quality, making it ideal for web performance. Adjust the quality slider to balance file size and visual fidelity. The conversion uses the browser's native Canvas API, so your images stay completely private.",
    category: "image",
    keywords: [
      "jpg to webp",
      "jpeg to webp",
      "convert jpg to webp",
      "jpg to webp converter",
      "jpeg to webp converter",
    ],
    icon: "🔄",
    isClientSide: true,
    relatedSlugs: ["png-to-webp", "webp-to-jpg", "jpg-to-pdf"],
    supportedFormats: ["JPG", "JPEG"],
    limitations: [
      "Only JPG/JPEG input is accepted",
      "Maximum file size: 50 MB",
    ],
    faq: [
      {
        question: "Why should I convert JPG to WebP?",
        answer:
          "WebP typically produces 25–35% smaller files than JPEG at equivalent visual quality. This makes it ideal for web performance, especially for sites that serve many images.",
      },
      {
        question: "Do all browsers support WebP?",
        answer:
          "WebP is supported by all modern browsers including Chrome, Firefox, Safari, and Edge. If you need maximum compatibility with older software, consider converting to PNG or keeping the original JPG instead.",
      },
    ],
  },
  {
    slug: "png-to-webp",
    name: "PNG to WebP",
    description:
      "Convert PNG images to WebP format in your browser. Reduce file size while controlling quality — no uploads required.",
    longDescription:
      "Convert PNG images to WebP format entirely in your browser. WebP supports both lossy and lossless compression, often producing significantly smaller files than PNG while maintaining visual quality. Use the quality slider to fine-tune the balance between file size and fidelity. Since the conversion runs locally via the Canvas API, your images never leave your device.",
    category: "image",
    keywords: [
      "png to webp",
      "convert png to webp",
      "png to webp converter",
      "png to webp conversion",
    ],
    icon: "🔄",
    isClientSide: true,
    relatedSlugs: ["jpg-to-webp", "webp-to-jpg", "jpg-to-pdf"],
    supportedFormats: ["PNG"],
    limitations: [
      "Only PNG input is accepted",
      "Maximum file size: 50 MB",
    ],
    faq: [
      {
        question: "Why should I convert PNG to WebP?",
        answer:
          "WebP often produces significantly smaller files than PNG while maintaining visual quality. For photographs or complex images, the savings can be 50% or more.",
      },
      {
        question: "Does WebP support transparency like PNG?",
        answer:
          "Yes, WebP supports both lossy and lossless compression as well as alpha transparency, making it a full-featured replacement for PNG in modern browsers.",
      },
    ],
  },
  {
    slug: "jpg-to-png",
    name: "JPG to PNG",
    description:
      "Convert JPG images to PNG format in your browser. Get lossless output with transparency support — no uploads.",
    longDescription:
      "Convert JPG and JPEG images to PNG format without any server-side processing. PNG provides lossless compression, preserving every pixel of the original image without quality loss. This is useful when you need the highest visual fidelity or when working with images that will be edited further. The conversion runs entirely in your browser using the Canvas API.",
    category: "image",
    keywords: [
      "jpg to png",
      "jpeg to png",
      "convert jpg to png",
      "jpg to png converter",
      "jpeg to png converter",
    ],
    icon: "🔄",
    isClientSide: true,
    relatedSlugs: ["webp-to-jpg", "png-to-webp", "jpg-to-pdf"],
    supportedFormats: ["JPG", "JPEG"],
    limitations: [
      "Only JPG/JPEG input is accepted",
      "Maximum file size: 50 MB",
      "PNG output does not support original JPG transparency",
    ],
    faq: [
      {
        question: "Why convert JPG to PNG?",
        answer:
          "PNG uses lossless compression, preserving every pixel without quality loss. This is useful when you need the highest visual fidelity or plan to edit the image further. Note that PNG files are typically larger than JPG.",
      },
      {
        question: "Does PNG support transparency?",
        answer:
          "Yes. When converting from JPG to PNG, the result will not have transparency (since JPG does not support it), but the PNG format itself does support alpha transparency for future editing.",
      },
    ],
  },
  {
    slug: "webp-to-jpg",
    name: "WebP to JPG",
    description:
      "Convert WebP images to JPG format in your browser. Adjust quality and download instantly — no uploads, no sign-up.",
    longDescription:
      "Convert WebP images to the widely compatible JPG format directly in your browser. JPG is supported everywhere, making it the safest choice when you need maximum compatibility across older devices and software. Adjust the quality slider to control the balance between file size and visual quality. All processing is local — your images never leave your device.",
    category: "image",
    keywords: [
      "webp to jpg",
      "convert webp to jpg",
      "webp to jpg converter",
      "webp to jpeg",
      "webp to jpeg converter",
    ],
    icon: "🔄",
    isClientSide: true,
    relatedSlugs: ["jpg-to-png", "jpg-to-webp", "jpg-to-pdf"],
    supportedFormats: ["WebP"],
    limitations: [
      "Only WebP input is accepted",
      "Maximum file size: 50 MB",
      "JPG output does not support transparency",
    ],
    faq: [
      {
        question: "Why convert WebP to JPG?",
        answer:
          "JPG is universally supported across all devices and software, including older systems that may not support WebP. Converting to JPG ensures maximum compatibility.",
      },
      {
        question: "Will I lose quality converting WebP to JPG?",
        answer:
          "Both formats use lossy compression, so some quality loss may occur. Use the quality slider to minimize artifacts — 85% or higher is recommended for most use cases.",
      },
    ],
  },
  {
    slug: "jpg-to-pdf",
    name: "JPG to PDF",
    description:
      "Convert JPG, PNG, and WebP images into a single PDF in your browser. Reorder pages, choose A4 or Letter size, and download — no uploads.",
    longDescription:
      "Combine multiple images into a single PDF document without uploading anything to a server. Drag and drop JPG, PNG, or WebP files, reorder them by dragging, remove unwanted pages, and choose between A4, Letter, or original image dimensions. The PDF is generated entirely in your browser using the jsPDF library — your images never leave your device. Supports up to 50 images per PDF.",
    category: "image",
    keywords: [
      "jpg to pdf",
      "jpeg to pdf",
      "convert jpg to pdf",
      "image to pdf",
      "png to pdf",
      "images to pdf",
      "create pdf from images",
    ],
    icon: "📄",
    isClientSide: true,
    featured: true,
    relatedSlugs: ["pdf-to-jpg", "merge-pdf", "split-pdf"],
    supportedFormats: ["JPG", "JPEG", "PNG", "WebP"],
    limitations: [
      "Maximum 50 images per PDF",
      "Maximum file size: 50 MB per image",
      "Output is a standard PDF — text is not searchable or editable",
    ],
    faq: [
      {
        question: "Can I reorder images after uploading them?",
        answer:
          "Yes. Use the arrow buttons on each image thumbnail to move it left or right in the page order. You can also remove individual images before generating the PDF.",
      },
      {
        question: "What page sizes are supported?",
        answer:
          "You can choose A4 (210×297mm), US Letter (216×280mm), or original image size. For A4 and Letter, images are automatically centered and scaled to fit within the page with a 10mm margin. You can also switch between portrait and landscape orientation.",
      },
      {
        question: "Are my images uploaded to a server?",
        answer:
          "No. All processing happens in your browser using the jsPDF library. Your images are never transmitted to any server.",
      },
    ],
  },
  {
    slug: "pdf-to-jpg",
    name: "PDF to JPG",
    description:
      "Convert PDF pages to JPG images in your browser. Select pages, adjust quality and resolution, and download individually or as a ZIP — no uploads.",
    longDescription:
      "Render PDF pages as JPG images entirely in your browser using PDF.js. Upload a PDF, preview all pages as thumbnails, select which pages to convert, and choose the output quality and resolution. Download individual images or all selected pages as a ZIP archive. Supports PDFs up to 50 MB and 100 pages. All rendering is local — your PDF never leaves your device.",
    category: "pdf",
    keywords: [
      "pdf to jpg",
      "convert pdf to jpg",
      "pdf to jpeg",
      "pdf to image",
      "pdf to jpg converter",
      "extract images from pdf",
    ],
    icon: "🖼️",
    isClientSide: true,
    relatedSlugs: ["jpg-to-pdf", "split-pdf", "merge-pdf"],
    supportedFormats: ["PDF"],
    limitations: [
      "Maximum file size: 50 MB",
      "Maximum 100 pages per PDF",
      "Encrypted or password-protected PDFs may not render correctly",
    ],
    faq: [
      {
        question: "Can I convert specific pages instead of the entire PDF?",
        answer:
          "Yes. After uploading, you'll see thumbnails of all pages. Click to select or deselect individual pages, or use the Select All / Deselect All buttons. Only selected pages will be converted.",
      },
      {
        question: "What resolution and quality can I expect?",
        answer:
          "You control both. The resolution slider ranges from 1× to 4× (relative to the PDF's native size), and the quality slider ranges from 30% to 100% JPEG quality. Higher values produce sharper, larger files; lower values produce smaller, more compressed files.",
      },
      {
        question: "How are the images downloaded?",
        answer:
          "Each converted page can be downloaded individually by clicking the download button on its thumbnail. You can also download all converted images at once as a ZIP archive.",
      },
    ],
  },
  {
    slug: "merge-pdf",
    name: "Merge PDF",
    description:
      "Combine multiple PDF files into one in your browser. Drag, drop, reorder, and merge — no uploads, no sign-up, completely free.",
    longDescription:
      "Merge multiple PDF documents into a single file without uploading them anywhere. Drag and drop your PDFs, reorder them by moving up or down, remove unwanted files, and click merge. The merged PDF is generated locally using the pdf-lib library — your files never leave your device. Supports up to 20 PDFs with a total size of 200 MB.",
    category: "pdf",
    keywords: [
      "merge pdf",
      "combine pdf",
      "join pdf",
      "pdf merger",
      "combine pdf files",
      "merge pdf files",
    ],
    icon: "🔗",
    isClientSide: true,
    relatedSlugs: ["split-pdf", "pdf-to-jpg", "jpg-to-pdf"],
    supportedFormats: ["PDF"],
    limitations: [
      "Maximum 20 PDF files per merge",
      "Maximum total size: 200 MB",
      "Each input PDF must be 50 MB or smaller",
    ],
    faq: [
      {
        question: "Is there a limit on the number of PDFs I can merge?",
        answer:
          "You can merge up to 20 PDF files with a combined size of up to 200 MB. This limit exists to prevent browser memory issues during the merge process.",
      },
      {
        question: "Can I reorder the PDFs before merging?",
        answer:
          "Yes. Use the up and down arrows next to each file to change the order. The merged PDF will contain pages in the order shown on screen.",
      },
      {
        question: "Are my PDF files uploaded to a server?",
        answer:
          "No. Merging is performed entirely in your browser using the pdf-lib library. Your files are never transmitted to any server.",
      },
    ],
  },
  {
    slug: "split-pdf",
    name: "Split PDF",
    description:
      "Split or extract PDF pages in your browser. Extract specific page ranges or split every page into separate PDFs — no uploads required.",
    longDescription:
      "Extract specific pages from a PDF or split it into individual single-page PDFs without uploading anything. Upload a PDF, see the page count, then either enter a page range (like 1-3, 5, 7-9) to extract those pages into one PDF, or choose to split every page into separate PDFs downloaded as a ZIP. All processing is local using the pdf-lib library — your PDF never leaves your device. Supports PDFs up to 50 MB and 100 pages.",
    category: "pdf",
    keywords: [
      "split pdf",
      "extract pdf pages",
      "pdf splitter",
      "divide pdf",
      "separate pdf pages",
      "extract pages from pdf",
    ],
    icon: "✂️",
    isClientSide: true,
    relatedSlugs: ["merge-pdf", "pdf-to-jpg", "jpg-to-pdf"],
    supportedFormats: ["PDF"],
    limitations: [
      "Maximum file size: 50 MB",
      "Maximum 100 pages per PDF",
      "Encrypted or password-protected PDFs may not be supported",
    ],
    faq: [
      {
        question: "How do I specify which pages to extract?",
        answer:
          "Enter page numbers separated by commas. Use hyphens for ranges. For example, \"1-3, 5, 7-9\" extracts pages 1, 2, 3, 5, 7, 8, and 9 into a single PDF.",
      },
      {
        question: "Can I split every page into its own PDF?",
        answer:
          "Yes. Select the \"Split every page\" mode and click the split button. Each page will become a separate PDF file, and all files will be downloaded together as a ZIP archive.",
      },
      {
        question: "Is my PDF uploaded to a server?",
        answer:
          "No. All splitting and extraction happens in your browser using the pdf-lib library. Your PDF is never transmitted to any server.",
      },
    ],
  },
  {
    slug: "word-counter",
    name: "Word Counter",
    description:
      "Count words, characters, sentences, paragraphs, and estimated reading time in real time. Free, instant, and entirely in your browser.",
    longDescription:
      "Get instant word and character counts for any text. This tool updates live as you type or paste text, showing word count, character count (with and without spaces), sentence count, paragraph count, and an estimated reading time based on an average of 200 words per minute. All processing happens in your browser — your text is never sent to a server.",
    category: "text",
    keywords: [
      "word counter",
      "count words",
      "character count",
      "sentence counter",
      "paragraph counter",
      "reading time calculator",
      "text analyzer",
    ],
    icon: "📝",
    isClientSide: true,
    relatedSlugs: ["character-counter", "case-converter", "text-sorter"],
    supportedFormats: ["Plain text", "Any text input"],
    limitations: [
      "Reading time is an estimate based on 200 words per minute",
      "Sentence detection uses punctuation marks (. ! ?) as delimiters",
    ],
    faq: [
      {
        question: "How is reading time calculated?",
        answer:
          "Reading time is estimated by dividing the word count by an average reading speed of 200 words per minute. Your actual reading speed may vary.",
      },
      {
        question: "Is my text uploaded to a server?",
        answer:
          "No. All counting happens entirely in your browser. Your text is never transmitted to any server.",
      },
    ],
  },
  {
    slug: "character-counter",
    name: "Character Counter",
    description:
      "Count characters with and without spaces, words, and lines in real time. Free, instant, and entirely in your browser.",
    longDescription:
      "Get precise character counts for any text, including characters with and without spaces, word count, and line count. The counter updates live as you type or paste text. Useful for writing within character limits for social media, meta descriptions, SMS messages, and form fields. All processing happens locally in your browser.",
    category: "text",
    keywords: [
      "character counter",
      "count characters",
      "letter count",
      "character count online",
      "text length checker",
      "character limit checker",
    ],
    icon: "🔢",
    isClientSide: true,
    relatedSlugs: ["word-counter", "case-converter", "remove-duplicate-lines"],
    supportedFormats: ["Plain text", "Any text input"],
    limitations: [
      "Counts Unicode characters, not bytes — emoji and special characters count as single characters",
    ],
    faq: [
      {
        question: "Does this count bytes or characters?",
        answer:
          "This tool counts Unicode characters, not bytes. A single emoji or accented character counts as one character, even though it may occupy multiple bytes in UTF-8 encoding.",
      },
      {
        question: "Can I use this for social media character limits?",
        answer:
          "Yes. The character count (including and excluding spaces) is suitable for checking limits on platforms like Twitter, Instagram, and meta descriptions for SEO.",
      },
    ],
  },
  {
    slug: "case-converter",
    name: "Case Converter",
    description:
      "Convert text to UPPERCASE, lowercase, Title Case, Sentence case, or toggle case instantly in your browser.",
    longDescription:
      "Transform text between different letter cases with one click. Choose from UPPERCASE, lowercase, Title Case (each word capitalized), Sentence case (first letter of each sentence capitalized), or toggle case (reverse the case of each letter). All transformations happen instantly in your browser — no uploads, no sign-up.",
    category: "text",
    keywords: [
      "case converter",
      "uppercase converter",
      "lowercase converter",
      "title case converter",
      "sentence case",
      "text case changer",
      "capitalize text",
    ],
    icon: "🔠",
    isClientSide: true,
    relatedSlugs: ["word-counter", "text-sorter", "remove-duplicate-lines"],
    supportedFormats: ["Plain text", "Any text input"],
    limitations: [
      "Title Case capitalizes every word — for headlines, manual review may be needed for articles and prepositions",
      "Sentence case relies on punctuation (. ! ?) to detect sentence boundaries",
    ],
    faq: [
      {
        question: "What is the difference between Title Case and Sentence case?",
        answer:
          "Title Case capitalizes the first letter of every word (e.g., \"The Quick Brown Fox\"). Sentence case only capitalizes the first letter of each sentence (e.g., \"The quick brown fox\").",
      },
      {
        question: "What is toggle case?",
        answer:
          "Toggle case reverses the case of each letter — uppercase becomes lowercase and vice versa. For example, \"Hello World\" becomes \"hELLO wORLD\".",
      },
    ],
  },
  {
    slug: "remove-duplicate-lines",
    name: "Remove Duplicate Lines",
    description:
      "Remove duplicate lines from any text in your browser. Optional case sensitivity and whitespace trimming. See how many duplicates were removed.",
    longDescription:
      "Clean up lists and text by removing duplicate lines. This tool preserves the first occurrence of each line and removes subsequent duplicates. Toggle case sensitivity to control whether \"Apple\" and \"apple\" are treated as duplicates, and optionally trim whitespace before comparing. The tool shows how many duplicates were removed. All processing happens locally — your text never leaves your browser.",
    category: "text",
    keywords: [
      "remove duplicate lines",
      "deduplicate lines",
      "remove duplicates",
      "unique lines",
      "dedupe text",
      "remove repeated lines",
    ],
    icon: "🧹",
    isClientSide: true,
    relatedSlugs: ["text-sorter", "case-converter", "word-counter"],
    supportedFormats: ["Plain text", "One item per line"],
    limitations: [
      "Only exact line matches are considered duplicates — partial or fuzzy matches are not detected",
      "The first occurrence of each line is always preserved in its original position",
    ],
    faq: [
      {
        question: "Does this preserve the original order of lines?",
        answer:
          "Yes. The first occurrence of each line is kept in its original position, and only subsequent duplicates are removed.",
      },
      {
        question: "What does the trim whitespace option do?",
        answer:
          "When enabled, leading and trailing whitespace is removed from each line before comparing. This means \"  apple  \" and \"apple\" would be treated as duplicates.",
      },
    ],
  },
  {
    slug: "text-sorter",
    name: "Text Sorter",
    description:
      "Sort lines of text alphabetically or numerically, ascending or descending. Optional case sensitivity, trimming, and empty line removal — all in your browser.",
    longDescription:
      "Sort lines of text alphabetically (A–Z or Z–A) or numerically (ascending or descending). Control whether sorting is case sensitive, trim whitespace from each line, and remove empty lines before sorting. Useful for organizing lists, sorting data, and cleaning up text. All processing happens locally in your browser.",
    category: "text",
    keywords: [
      "text sorter",
      "sort lines",
      "alphabetical sort",
      "sort text online",
      "line sorter",
      "sort alphabetically",
    ],
    icon: "↕️",
    isClientSide: true,
    relatedSlugs: ["remove-duplicate-lines", "case-converter", "word-counter"],
    supportedFormats: ["Plain text", "One item per line"],
    limitations: [
      "Numeric sort extracts the first number from each line for comparison",
      "Lines without a numeric value are sorted as -Infinity in numeric mode",
    ],
    faq: [
      {
        question: "How does numeric sort work?",
        answer:
          "Numeric sort extracts the first number found in each line and sorts by that value. Lines without any numbers are placed at the beginning (ascending) or end (descending).",
      },
      {
        question: "Can I sort case-insensitively?",
        answer:
          "Yes. By default, case sensitivity is off, meaning \"apple\" and \"Apple\" are treated equally. Enable the case sensitive option to sort them separately.",
      },
    ],
  },
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    description:
      "Generate QR codes from any text or URL in your browser. Customize size and error correction, then download as PNG — no uploads, no sign-up.",
    longDescription:
      "Create QR codes from any text or URL directly in your browser. Enter your content, choose the size (128–512px) and error correction level (L/M/Q/H), and download the QR code as a PNG image. The QR code is generated locally using the open-source qrcode library — your data is never sent to a server. Higher error correction levels allow the QR code to remain scannable even when partially obscured.",
    category: "generators",
    keywords: [
      "qr code generator",
      "qr code maker",
      "create qr code",
      "generate qr code",
      "qr code online",
      "url to qr code",
    ],
    icon: "📱",
    isClientSide: true,
    relatedSlugs: ["password-generator", "uuid-generator", "random-number-generator"],
    supportedFormats: ["Text", "URLs", "Any string input"],
    limitations: [
      "Maximum input length depends on the error correction level and character type",
      "Very long URLs may produce dense QR codes that are difficult to scan at small sizes",
    ],
    faq: [
      {
        question: "What error correction level should I use?",
        answer:
          "Medium (M, 15%) is suitable for most use cases. Use High (H, 30%) if the QR code may be partially obscured or printed in a noisy environment. Lower levels produce simpler codes that scan more easily.",
      },
      {
        question: "Can I generate QR codes for Wi-Fi passwords or contact info?",
        answer:
          "Yes. Enter the appropriate formatted string (e.g., a vCard for contacts or a Wi-Fi config string) and the QR code will encode it. The format must follow the standard for each type.",
      },
    ],
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    description:
      "Generate secure passwords using the Web Crypto API. Configure length, character types, and exclude ambiguous characters — all in your browser.",
    longDescription:
      "Create strong, random passwords using the browser's built-in Web Crypto API for cryptographically secure random number generation. Configure the password length (4–64 characters), choose which character types to include (uppercase, lowercase, numbers, symbols), and optionally exclude ambiguous characters like Il1O0o. The password strength indicator helps you gauge security. No passwords are ever sent to a server — everything happens locally.",
    category: "generators",
    keywords: [
      "password generator",
      "generate password",
      "secure password",
      "random password",
      "strong password generator",
      "password maker",
    ],
    icon: "🔐",
    isClientSide: true,
    relatedSlugs: ["uuid-generator", "qr-code-generator", "random-number-generator"],
    supportedFormats: ["Configurable password output"],
    limitations: [
      "Maximum length: 64 characters",
      "At least one character type must be selected",
    ],
    faq: [
      {
        question: "Is this password generator secure?",
        answer:
          "Yes. Passwords are generated using the Web Crypto API's crypto.getRandomValues(), which provides cryptographically secure random numbers. Math.random() is never used for password generation.",
      },
      {
        question: "Are generated passwords stored or sent anywhere?",
        answer:
          "No. Passwords are generated entirely in your browser and are never transmitted to any server or stored anywhere.",
      },
      {
        question: "What are ambiguous characters?",
        answer:
          "Ambiguous characters like uppercase I, lowercase l, the number 1, uppercase O, and the number 0 can be confused when reading or typing passwords. The exclude option removes these from the generated password.",
      },
    ],
  },
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    description:
      "Generate UUID v4 identifiers in your browser using crypto.randomUUID(). Generate up to 50 UUIDs at once — no uploads, no sign-up.",
    longDescription:
      "Generate RFC 4122 version 4 UUIDs (universally unique identifiers) using the browser's native crypto.randomUUID() API. Generate up to 50 UUIDs at once, with optional uppercase formatting. Each UUID is cryptographically random and suitable for use as database keys, file names, session tokens, or any context requiring unique identifiers. All generation happens locally in your browser.",
    category: "generators",
    keywords: [
      "uuid generator",
      "uuid v4",
      "guid generator",
      "generate uuid",
      "unique identifier",
      "uuid online",
    ],
    icon: "🆔",
    isClientSide: true,
    relatedSlugs: ["password-generator", "random-number-generator", "qr-code-generator"],
    supportedFormats: ["UUID v4 (RFC 4122)"],
    limitations: [
      "Maximum 50 UUIDs per generation",
      "UUIDs are version 4 (random) only — other versions are not supported",
    ],
    faq: [
      {
        question: "What is a UUID v4?",
        answer:
          "UUID v4 is a randomly generated 128-bit identifier standardized by RFC 4122. It is represented as 32 hexadecimal digits separated by hyphens (e.g., 550e8400-e29b-41d4-a716-446655440000).",
      },
      {
        question: "How are UUIDs generated?",
        answer:
          "This tool uses the browser's native crypto.randomUUID() function when available, which provides cryptographically secure random UUIDs. A fallback using crypto.getRandomValues() is used for older browsers.",
      },
    ],
  },
  {
    slug: "random-number-generator",
    name: "Random Number Generator",
    description:
      "Generate random numbers within a range using cryptographically secure randomness. Choose integer or decimal, generate up to 100 at once — all in your browser.",
    longDescription:
      "Generate random numbers within a specified range using the Web Crypto API for cryptographically secure randomness. Set minimum and maximum values, choose between integer or decimal output, and generate up to 100 numbers at once. The random numbers are suitable for games, lotteries, statistical sampling, or any application requiring unbiased random values. All generation happens locally in your browser.",
    category: "generators",
    keywords: [
      "random number generator",
      "generate random number",
      "random number",
      "secure random",
      "random integer",
      "number randomizer",
    ],
    icon: "🎲",
    isClientSide: true,
    relatedSlugs: ["uuid-generator", "password-generator", "qr-code-generator"],
    supportedFormats: ["Integers", "Decimal numbers"],
    limitations: [
      "Maximum 100 numbers per generation",
      "Decimal numbers are displayed with 4 decimal places",
    ],
    faq: [
      {
        question: "Are these random numbers cryptographically secure?",
        answer:
          "Yes. This tool uses the Web Crypto API's crypto.getRandomValues() for generating random numbers, which provides cryptographically secure randomness suitable for security-sensitive applications.",
      },
      {
        question: "Can I generate numbers for a lottery or raffle?",
        answer:
          "Yes. Set the min and max to your range, select integer mode, and generate the quantity you need. Each number is independently generated, so duplicates are possible within a batch.",
      },
    ],
  },
  {
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    description:
      "Calculate percentages in your browser — X% of Y, percentage increase/decrease, and percentage difference. Free, instant, no uploads.",
    longDescription:
      "Perform common percentage calculations instantly. Calculate what X% of Y is, find the percentage increase or decrease between two values, or determine the percentage difference between two numbers. All three modes are available in one tool with clear, labeled inputs. Every calculation happens locally in your browser — no data is sent to any server.",
    category: "calculators",
    keywords: [
      "percentage calculator",
      "percent calculator",
      "calculate percentage",
      "percentage increase",
      "percentage decrease",
      "percentage difference",
      "percent of",
    ],
    icon: "🧮",
    isClientSide: true,
    relatedSlugs: ["word-counter", "character-counter", "random-number-generator"],
    supportedFormats: ["Numeric input"],
    limitations: [
      "Does not support compound percentage calculations or chained operations",
      "Percentage change requires a non-zero original value",
    ],
    faq: [
      {
        question: "What is the difference between percentage change and percentage difference?",
        answer:
          "Percentage change measures how much a value changed from an original to a new value (e.g., sales grew 20%). Percentage difference compares two values without designating one as original (e.g., the difference between 50 and 60 is 18.18%).",
      },
      {
        question: "How do I calculate X% of Y?",
        answer:
          'Select "X% of Y" mode, enter the percentage in the first field and the value in the second field. For example, to find 15% of 200, enter 15 and 200. The result will be 30.',
      },
    ],
  },
  {
    slug: "png-to-jpg",
    name: "PNG to JPG",
    description:
      "Convert PNG images to JPG format in your browser. Adjust quality, set background color for transparency, and download instantly — no uploads.",
    longDescription:
      "Convert PNG images to the widely compatible JPG format directly in your browser. Since JPG does not support transparency, you can choose a background color to fill transparent areas. Adjust the quality slider to control the balance between file size and visual quality. All processing is local via the Canvas API — your images never leave your device.",
    category: "image",
    keywords: [
      "png to jpg",
      "convert png to jpg",
      "png to jpg converter",
      "png to jpeg",
      "png to jpeg converter",
    ],
    icon: "🔄",
    isClientSide: true,
    relatedSlugs: ["jpg-to-png", "png-to-webp", "webp-to-jpg"],
    supportedFormats: ["PNG"],
    limitations: [
      "Only PNG input is accepted",
      "Maximum file size: 50 MB",
      "JPG does not support transparency — transparent areas are filled with the chosen background color",
    ],
    faq: [
      {
        question: "What happens to transparency when converting PNG to JPG?",
        answer:
          "JPG does not support alpha transparency. Any transparent or semi-transparent pixels in the PNG will be filled with the background color you choose (white by default). You can change this color in the settings.",
      },
      {
        question: "Will the converted JPG be smaller than the original PNG?",
        answer:
          "In most cases, yes. JPG uses lossy compression which typically produces much smaller files than PNG's lossless compression, especially for photographs and complex images.",
      },
    ],
  },
  {
    slug: "webp-to-png",
    name: "WebP to PNG",
    description:
      "Convert WebP images to PNG format in your browser. Get lossless output with transparency support — no uploads, no sign-up.",
    longDescription:
      "Convert WebP images to PNG format entirely in your browser. PNG provides lossless compression and supports alpha transparency, making it ideal when you need the highest visual fidelity or when working with images that require transparency. The conversion runs locally via the Canvas API — your images never leave your device.",
    category: "image",
    keywords: [
      "webp to png",
      "convert webp to png",
      "webp to png converter",
      "webp to png conversion",
    ],
    icon: "🔄",
    isClientSide: true,
    relatedSlugs: ["webp-to-jpg", "png-to-webp", "jpg-to-png"],
    supportedFormats: ["WebP"],
    limitations: [
      "Only WebP input is accepted",
      "Maximum file size: 50 MB",
    ],
    faq: [
      {
        question: "Why convert WebP to PNG?",
        answer:
          "PNG provides lossless compression and universal compatibility. It's ideal when you need the highest visual fidelity, transparency support, or when working with software that doesn't support WebP.",
      },
      {
        question: "Does PNG preserve transparency from WebP?",
        answer:
          "Yes. Both WebP and PNG support alpha transparency, so transparent areas in the WebP will be preserved in the PNG output.",
      },
    ],
  },
  {
    slug: "image-cropper",
    name: "Image Cropper",
    description:
      "Crop images in your browser with aspect ratio presets. Drag to adjust the crop area, choose output format, and download — no uploads.",
    longDescription:
      "Crop images visually in your browser with an interactive crop area. Drag to move and resize the selection, or apply aspect ratio presets like 1:1, 4:3, 16:9, 3:4, or 9:16. Choose between PNG and JPG output format, adjust quality for JPG, and download the cropped result. All processing is local via the Canvas API — your images never leave your device.",
    category: "image",
    keywords: [
      "image cropper",
      "crop image",
      "photo cropper",
      "crop image online",
      "aspect ratio crop",
      "image trim",
    ],
    icon: "✂️",
    isClientSide: true,
    relatedSlugs: ["image-resizer", "image-compressor", "png-to-jpg"],
    supportedFormats: ["JPG", "JPEG", "PNG", "WebP"],
    limitations: [
      "Maximum file size: 50 MB",
      "Crop area must be at least 1×1 pixel",
      "Animated images are not supported",
    ],
    faq: [
      {
        question: "How do I crop to a specific aspect ratio?",
        answer:
          "Click one of the aspect ratio preset buttons (1:1, 4:3, 16:9, 3:4, 9:16). The crop area will adjust to that ratio. You can then drag to move or resize it while maintaining the ratio.",
      },
      {
        question: "Can I crop freely without a fixed ratio?",
        answer:
          'Yes. Select the "Free" preset to crop without any aspect ratio constraint. You can drag the crop area and resize handle freely.',
      },
    ],
  },
  {
    slug: "lorem-ipsum-generator",
    name: "Lorem Ipsum Generator",
    description:
      "Generate Lorem Ipsum placeholder text in your browser. Choose paragraphs, sentences, or words — copy or download instantly, no sign-up.",
    longDescription:
      "Generate classic Lorem Ipsum placeholder text for your designs, mockups, or development projects. Choose to generate by paragraphs, sentences, or words, and specify the quantity (1–50). The generated text can be copied to the clipboard or downloaded as a TXT file. All generation happens locally in your browser.",
    category: "generators",
    keywords: [
      "lorem ipsum generator",
      "lorem ipsum",
      "placeholder text",
      "dummy text generator",
      "lipsum",
      "filler text",
    ],
    icon: "📄",
    isClientSide: true,
    relatedSlugs: ["word-counter", "character-counter", "password-generator"],
    supportedFormats: ["Plain text"],
    limitations: [
      "Maximum 50 paragraphs, sentences, or words per generation",
      "Generated text uses a fixed word pool — some repetition may occur in longer outputs",
    ],
    faq: [
      {
        question: "What is Lorem Ipsum?",
        answer:
          "Lorem Ipsum is standard placeholder text used in printing, design, and development. It's derived from a Latin text by Cicero and has been used as dummy text since the 1500s.",
      },
      {
        question: "Can I generate more than 50 paragraphs?",
        answer:
          "The limit is 50 per generation to keep the output manageable. You can click Generate multiple times and combine the results if you need more.",
      },
    ],
  },
  {
    slug: "discount-calculator",
    name: "Discount Calculator",
    description:
      "Calculate discounts and final prices in your browser. Enter original price and discount percentage to see savings instantly — free, no sign-up.",
    longDescription:
      "Quickly calculate the final price and savings amount after applying a discount. Enter the original price and the discount percentage, and the tool shows the discount amount, final price, and percentage off. Useful for shopping, sales, and budgeting. All calculations happen locally in your browser.",
    category: "calculators",
    keywords: [
      "discount calculator",
      "sale calculator",
      "price calculator",
      "percent off calculator",
      "discount price",
      "savings calculator",
    ],
    icon: "🏷️",
    isClientSide: true,
    relatedSlugs: ["percentage-calculator", "bmi-calculator", "age-calculator"],
    supportedFormats: ["Numeric input"],
    limitations: [
      "Discount percentage must be between 0 and 100",
      "Does not support compound or stacked discounts",
    ],
    faq: [
      {
        question: "How is the discount calculated?",
        answer:
          "The discount amount is calculated as (original price × discount %) / 100. The final price is the original price minus the discount amount.",
      },
      {
        question: "Can I calculate discounts with tax?",
        answer:
          "This tool calculates the discount only. To include tax, calculate the discounted price first, then apply tax to the result separately.",
      },
    ],
  },
  {
    slug: "age-calculator",
    name: "Age Calculator",
    description:
      "Calculate your exact age in years, months, and days from your date of birth. See total days, weeks, months, and next birthday — all in your browser.",
    longDescription:
      "Calculate your exact age from your date of birth. The tool shows your age in years, months, and days, plus the total number of days, weeks, and months you've lived. It also calculates the number of days until your next birthday. Useful for age verification, milestone tracking, or curiosity. All calculations happen locally in your browser.",
    category: "calculators",
    keywords: [
      "age calculator",
      "calculate age",
      "age from date of birth",
      "birthday calculator",
      "how old am i",
      "age in days",
    ],
    icon: "🎂",
    isClientSide: true,
    relatedSlugs: ["date-calculator", "discount-calculator", "percentage-calculator"],
    supportedFormats: ["Date input"],
    limitations: [
      "Date of birth must be in the past",
      "Calculations use the Gregorian calendar",
    ],
    faq: [
      {
        question: "How is age calculated?",
        answer:
          "Age is calculated by comparing your date of birth to today's date, accounting for the difference in years, months, and days. If your birthday hasn't occurred yet this year, the year count is reduced by one.",
      },
      {
        question: "Is my date of birth stored or sent anywhere?",
        answer:
          "No. All calculations happen entirely in your browser. Your date of birth is never transmitted to any server or stored anywhere.",
      },
    ],
  },
  {
    slug: "date-calculator",
    name: "Date Calculator",
    description:
      "Add or subtract days from a date, or calculate the difference between two dates in days, weeks, months, and years — all in your browser.",
    longDescription:
      "Perform date calculations in two modes: add or subtract days from a starting date, or find the difference between two dates. The difference mode shows the result in days, weeks, months, and years. Useful for project planning, deadline tracking, and calculating durations. All calculations happen locally in your browser.",
    category: "calculators",
    keywords: [
      "date calculator",
      "add days to date",
      "date difference calculator",
      "days between dates",
      "subtract days from date",
      "date math",
    ],
    icon: "📅",
    isClientSide: true,
    relatedSlugs: ["age-calculator", "discount-calculator", "percentage-calculator"],
    supportedFormats: ["Date input"],
    limitations: [
      "Calculations use the Gregorian calendar and ignore time zones",
      "Month and year calculations approximate by calendar difference, not exact days",
    ],
    faq: [
      {
        question: "Can I subtract days from a date?",
        answer:
          'Yes. In the "Add / Subtract Days" mode, enter a negative number of days to subtract. For example, entering -7 will give you the date 7 days before the start date.',
      },
      {
        question: "How is the difference between dates calculated?",
        answer:
          "The tool calculates the total number of days between the two dates, then derives weeks, months, and years from that difference using calendar arithmetic.",
      },
    ],
  },
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    description:
      "Calculate your Body Mass Index (BMI) in metric or imperial units. See your BMI category instantly — free, no sign-up, all in your browser.",
    longDescription:
      "Calculate your Body Mass Index (BMI) using either metric (cm, kg) or imperial (inches, lbs) units. The tool displays your BMI value and category (underweight, normal, overweight, or obese) with a reference chart. BMI is a general screening tool for body weight relative to height. All calculations happen locally in your browser.",
    category: "calculators",
    keywords: [
      "bmi calculator",
      "body mass index",
      "bmi calculator metric",
      "bmi calculator imperial",
      "calculate bmi",
      "health calculator",
    ],
    icon: "⚖️",
    isClientSide: true,
    relatedSlugs: ["percentage-calculator", "discount-calculator", "age-calculator"],
    supportedFormats: ["Numeric input (metric or imperial)"],
    limitations: [
      "BMI does not account for muscle mass, bone density, or body composition",
      "BMI is a general screening tool, not a medical diagnosis",
      "Not suitable for athletes, children, or pregnant women without professional consultation",
    ],
    faq: [
      {
        question: "What is BMI?",
        answer:
          "Body Mass Index (BMI) is a value derived from your height and weight. It's used as a general screening tool to identify whether you're at a healthy weight for your height.",
      },
      {
        question: "Is BMI accurate?",
        answer:
          "BMI is a general indicator and does not account for muscle mass, bone density, age, or sex. Athletes with high muscle mass may have a high BMI without being overweight. Consult a healthcare professional for a comprehensive assessment.",
      },
    ],
  },
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    description:
      "Format, minify, and validate JSON in your browser. Choose 2 or 4 space indentation, see error messages, and copy results — no uploads.",
    longDescription:
      "Format, minify, and validate JSON data directly in your browser. Paste your JSON, choose between 2 or 4 space indentation, and click Format to beautify it. Use Minify to compress JSON to a single line. The Validate option checks if your JSON is well-formed and reports any syntax errors with descriptive messages. All processing happens locally — your data never leaves your device.",
    category: "developers",
    keywords: [
      "json formatter",
      "json beautifier",
      "format json",
      "minify json",
      "json validator",
      "json pretty print",
      "validate json",
    ],
    icon: "🔧",
    isClientSide: true,
    relatedSlugs: ["base64-encoder", "base64-decoder", "uuid-generator"],
    supportedFormats: ["JSON"],
    limitations: [
      "Input must be valid JSON — JSONP or JavaScript objects are not supported",
      "Very large JSON files may cause browser performance issues",
    ],
    faq: [
      {
        question: "What's the difference between format and minify?",
        answer:
          "Format (beautify) adds indentation and line breaks to make JSON human-readable. Minify removes all unnecessary whitespace to produce the smallest possible JSON string.",
      },
      {
        question: "How are JSON errors reported?",
        answer:
          "When JSON is invalid, the browser's native JSON.parse error message is displayed, which typically includes the position of the syntax error.",
      },
    ],
  },
  {
    slug: "base64-encoder",
    name: "Base64 Encoder",
    description:
      "Encode text to Base64 in your browser. Supports UTF-8 text including emoji and special characters — no uploads, no sign-up.",
    longDescription:
      "Encode any text to Base64 format directly in your browser. The tool uses the TextEncoder API to properly handle UTF-8 text, including emoji, accented characters, and multi-byte characters. Paste your text, click encode, and copy the Base64 result. All processing happens locally — your text never leaves your device.",
    category: "developers",
    keywords: [
      "base64 encoder",
      "encode base64",
      "text to base64",
      "base64 encode online",
      "utf-8 base64",
    ],
    icon: "🔐",
    isClientSide: true,
    relatedSlugs: ["base64-decoder", "json-formatter", "uuid-generator"],
    supportedFormats: ["Plain text", "UTF-8"],
    limitations: [
      "Encodes text only — binary data and files are not supported",
      "Base64 encoding increases size by approximately 33%",
    ],
    faq: [
      {
        question: "Does this support UTF-8 and emoji?",
        answer:
          "Yes. The tool uses the TextEncoder API to encode text as UTF-8 before converting to Base64, ensuring that emoji, accented characters, and other multi-byte characters are handled correctly.",
      },
      {
        question: "Is my text sent to a server?",
        answer:
          "No. All encoding happens entirely in your browser. Your text is never transmitted to any server.",
      },
    ],
  },
  {
    slug: "base64-decoder",
    name: "Base64 Decoder",
    description:
      "Decode Base64 to text in your browser. Supports UTF-8 text including emoji and special characters — no uploads, no sign-up.",
    longDescription:
      "Decode Base64 encoded text back to its original form directly in your browser. The tool uses the TextDecoder API to properly handle UTF-8 text, including emoji, accented characters, and multi-byte characters. Paste your Base64 string, click decode, and copy the result. All processing happens locally — your data never leaves your device.",
    category: "developers",
    keywords: [
      "base64 decoder",
      "decode base64",
      "base64 to text",
      "base64 decode online",
      "base64 to string",
    ],
    icon: "🔓",
    isClientSide: true,
    relatedSlugs: ["base64-encoder", "json-formatter", "uuid-generator"],
    supportedFormats: ["Base64 encoded text"],
    limitations: [
      "Input must be valid Base64 — invalid characters will produce an error",
      "Decodes to UTF-8 text only — binary data output is not supported",
    ],
    faq: [
      {
        question: "What happens if the Base64 input is invalid?",
        answer:
          "The tool will display an error message indicating the input is not valid Base64. Check for extra whitespace, special characters, or incomplete padding (=).",
      },
      {
        question: "Does this support UTF-8 and emoji?",
        answer:
          "Yes. The tool uses the TextDecoder API to decode the Base64 data as UTF-8, ensuring that emoji, accented characters, and other multi-byte characters are handled correctly.",
      },
    ],
  },
  {
    slug: "unit-converter",
    name: "Unit Converter",
    description:
      "Convert between units of length, weight, temperature, area, volume, speed, and time in your browser. Free, instant, no sign-up.",
    longDescription:
      "Convert between units across seven categories: length, weight, temperature, area, volume, speed, and time. Select a category, choose the from and to units, enter a value, and see the result instantly. The tool supports metric and imperial units, including common cooking measurements. All conversions happen locally in your browser.",
    category: "unit",
    keywords: [
      "unit converter",
      "length converter",
      "weight converter",
      "temperature converter",
      "area converter",
      "volume converter",
      "speed converter",
      "time converter",
      "metric to imperial",
    ],
    icon: "📏",
    isClientSide: true,
    relatedSlugs: ["percentage-calculator", "bmi-calculator", "discount-calculator"],
    supportedFormats: ["Numeric input"],
    limitations: [
      "Temperature conversions use Celsius as the base unit",
      "Volume conversions use US customary units (not imperial)",
      "Time conversions approximate a month as 30 days and a year as 365 days",
    ],
    faq: [
      {
        question: "What categories of units are supported?",
        answer:
          "Seven categories: length (mm to miles), weight (mg to stones), temperature (Celsius, Fahrenheit, Kelvin), area (mm² to acres), volume (ml to gallons), speed (m/s to knots), and time (ms to years).",
      },
      {
        question: "Are the volume units US or imperial?",
        answer:
          "Volume units use US customary measurements (US teaspoons, tablespoons, fluid ounces, cups, pints, quarts, and gallons). Imperial units are not currently supported.",
      },
    ],
  },
  {
    slug: "url-encoder-decoder",
    name: "URL Encoder/Decoder",
    description:
      "Encode and decode URL parameters in your browser. Handle spaces, special characters, and percent-encoding — no uploads, no sign-up.",
    longDescription:
      "Encode and decode URLs and URL parameters directly in your browser. Use encodeURIComponent for individual query parameters or encodeURI for full URLs. The decoder handles percent-encoded strings and converts them back to readable text. Supports spaces, special characters, Unicode, and multi-byte characters. All processing happens locally — your data never leaves your device.",
    category: "developers",
    keywords: [
      "url encoder",
      "url decoder",
      "percent encoding",
      "encode url",
      "decode url",
      "uri encoder",
      "uri decoder",
      "query parameter encoder",
    ],
    icon: "🔗",
    isClientSide: true,
    relatedSlugs: ["base64-encoder", "base64-decoder", "json-formatter"],
    limitations: [
      "encodeURI does not encode characters that are part of the URL syntax (?, &, =, /, etc.) — use encodeURIComponent for individual query parameter values",
      "Decoding invalid percent-encoded strings (e.g., stray % signs) will produce an error",
    ],
    faq: [
      {
        question: "What is the difference between encodeURI and encodeURIComponent?",
        answer:
          "encodeURI is for encoding full URLs — it preserves characters like :, /, ?, &, and = that are part of the URL structure. encodeURIComponent is for encoding individual query parameter values — it encodes all special characters including those that have meaning in URLs.",
      },
      {
        question: "Can I encode URLs with Unicode or emoji characters?",
        answer:
          "Yes. Both encodeURI and encodeURIComponent handle Unicode characters including emoji. They are converted to UTF-8 percent-encoded sequences (e.g., 🔗 becomes %F0%9F%94%97).",
      },
    ],
  },
  {
    slug: "image-to-base64",
    name: "Image to Base64 Converter",
    description:
      "Convert images to Base64 strings instantly. Drag and drop, get a data URL, HTML tag, or CSS snippet — 100% client-side, no uploads.",
    longDescription:
      "Convert any image to a Base64 data URL directly in your browser using the HTML5 FileReader API. Drag and drop or upload an image, and instantly get the Base64 string, a ready-to-paste HTML <img> tag, or a CSS background-image snippet. This is useful for embedding images directly in HTML, CSS, or JSON without external file requests. All processing happens locally — your images never leave your device.",
    category: "image",
    keywords: [
      "image to base64",
      "base64 image converter",
      "image to data url",
      "convert image to base64",
      "base64 encode image",
      "data uri image",
      "inline image base64",
    ],
    icon: "🖼️",
    isClientSide: true,
    relatedSlugs: ["image-compressor", "image-resizer", "image-cropper"],
    supportedFormats: ["JPG", "JPEG", "PNG", "WebP", "GIF", "SVG", "BMP"],
    limitations: [
      "Maximum file size: 10 MB (Base64 encoding increases size by ~33%)",
      "Very large images produce very long Base64 strings that may slow down page rendering",
      "Animated GIFs are supported but only the first frame is displayed in the preview",
    ],
    faq: [
      {
        question: "Is it safe to convert my images here?",
        answer:
          "Yes. All processing happens locally in your browser. Your images are never uploaded to any server — the conversion is done entirely client-side using the FileReader API.",
      },
      {
        question: "What output formats are available?",
        answer:
          "You can copy the raw Base64 data URL, a complete HTML <img> tag with the image embedded, or a CSS background-image snippet. Switch between the three output modes with one click.",
      },
    ],
  },
  {
    slug: "html-entity-encoder-decoder",
    name: "HTML Entity Encoder/Decoder",
    description:
      "Encode or decode HTML entities easily. Convert special characters like <, >, & to entities and back — all in your browser.",
    longDescription:
      "Convert special characters into HTML entities and vice versa directly in your browser. Encoding replaces characters like <, >, &, \", and ' with their entity equivalents (&lt;, &gt;, &amp;, &quot;, &#39;) so you can safely paste code or markup into HTML without it being interpreted as tags. Decoding reverses this, converting entities back to their original characters. All processing happens locally — your text never leaves your device.",
    category: "developers",
    keywords: [
      "html entity encoder",
      "html entity decoder",
      "encode html entities",
      "decode html entities",
      "html escape",
      "html unescape",
      "special characters to html",
    ],
    icon: "🔗",
    isClientSide: true,
    relatedSlugs: ["url-encoder-decoder", "base64-encoder", "base64-decoder"],
    supportedFormats: ["Plain text", "HTML"],
    limitations: [
      "Encoding covers the five core HTML entities: & < > \" '",
      "Decoding uses the browser's native HTML parser — malformed entities may not decode correctly",
    ],
    faq: [
      {
        question: "What characters does the encoder convert?",
        answer:
          "It converts the five most important HTML special characters: & to &amp;, < to &lt;, > to &gt;, \" to &quot;, and ' to &#39;. These are the characters that have special meaning in HTML markup and must be escaped to display them as literal text.",
      },
      {
        question: "Is my text sent to a server?",
        answer:
          "No. All encoding and decoding happens entirely in your browser. Your text is never transmitted to any server.",
      },
    ],
  },
  {
    slug: "epoch-timestamp-converter",
    name: "Epoch/Unix Timestamp Converter",
    description:
      "Convert Unix timestamps to human-readable dates and vice versa. Supports UTC and local timezones with live updates — all in your browser.",
    longDescription:
      "Convert between Unix epoch timestamps and human-readable date-times instantly. Enter a Unix timestamp to see the corresponding date and time, or pick a date-time to get its epoch value. Toggle between UTC and your local timezone. A live current-time display updates every second. Everything runs client-side — no data is sent to any server.",
    category: "developers",
    keywords: [
      "epoch converter",
      "unix timestamp converter",
      "unix to date",
      "date to unix",
      "epoch timestamp",
      "unix time converter",
      "timestamp to human readable",
    ],
    icon: "⏱️",
    isClientSide: true,
    relatedSlugs: ["date-calculator", "json-formatter", "url-encoder-decoder"],
    supportedFormats: ["Unix timestamp (seconds)", "Date-time string"],
    limitations: [
      "Timestamps are in seconds — millisecond precision is not supported in the input field",
      "Date-time input uses the browser's native datetime-local picker",
      "Date range is limited by JavaScript's Date object (±100,000,000 days from epoch)",
    ],
    faq: [
      {
        question: "What is a Unix timestamp?",
        answer:
          "A Unix timestamp (also called epoch time) is the number of seconds that have elapsed since January 1, 1970 (the Unix epoch), not counting leap seconds. It is widely used in programming, databases, and APIs.",
      },
      {
        question: "Does this tool support milliseconds?",
        answer:
          "The input field accepts timestamps in seconds. If you have a millisecond timestamp, divide by 1000 before entering it. The live current-time display also shows seconds.",
      },
    ],
  },
  {
    slug: "text-diff-checker",
    name: "Text Diff Checker",
    description:
      "Compare two text inputs side by side and highlight added, removed, and unchanged content. Lightweight client-side diff — no uploads.",
    longDescription:
      "Compare two pieces of text and instantly see the differences highlighted inline. Paste your original and modified text, click Compare, and the tool uses a longest common subsequence (LCS) algorithm to identify added, removed, and unchanged tokens. Added content is highlighted in green, removed content in red with strikethrough, and unchanged content appears as normal text. A summary shows the character counts for each category. All processing happens locally in your browser — your text never leaves your device.",
    category: "text",
    keywords: [
      "text diff checker",
      "compare text",
      "text comparison",
      "diff tool",
      "find differences in text",
      "text diff online",
      "compare two texts",
    ],
    icon: "🔍",
    isClientSide: true,
    relatedSlugs: ["word-counter", "character-counter", "case-converter"],
    supportedFormats: ["Plain text", "Any text input"],
    limitations: [
      "Comparison is token-based (words and whitespace) — very long texts may be slow due to O(n×m) LCS algorithm",
      "Does not support line-by-line diff mode — differences are shown inline",
    ],
    faq: [
      {
        question: "How does the diff algorithm work?",
        answer:
          "The tool tokenizes both inputs into words and punctuation, then uses a longest common subsequence (LCS) algorithm to identify matching and differing tokens. Added tokens are highlighted in green, removed tokens in red with strikethrough, and unchanged tokens appear as normal text.",
      },
      {
        question: "Is my text sent to a server?",
        answer:
          "No. All comparison happens entirely in your browser. Your text is never transmitted to any server.",
      },
    ],
  },
  {
    slug: "markdown-to-html",
    name: "Markdown to HTML Live Preview",
    description:
      "Write Markdown and see a live HTML preview side by side. Copy the generated HTML instantly — all in your browser, no uploads.",
    longDescription:
      "Convert Markdown to HTML in real time with a responsive split-screen editor. Type Markdown on the left and see the rendered preview on the right instantly. Switch between split view, preview-only, and raw HTML output modes. Supports headings, bold/italic, links, images, code blocks, inline code, lists, blockquotes, and horizontal rules. Copy the generated HTML with one click. All processing happens locally in your browser — your content never leaves your device.",
    category: "text",
    keywords: [
      "markdown to html",
      "markdown preview",
      "markdown editor",
      "md to html",
      "live markdown preview",
      "markdown converter",
      "markdown renderer",
    ],
    icon: "📝",
    isClientSide: true,
    relatedSlugs: ["json-formatter", "text-diff-checker", "word-counter"],
    supportedFormats: ["Markdown", "HTML"],
    limitations: [
      "Supports common Markdown features: headings, bold, italic, links, images, code blocks, lists, blockquotes, and horizontal rules",
      "Tables and footnotes are not supported in this lightweight parser",
    ],
    faq: [
      {
        question: "What Markdown features are supported?",
        answer:
          "Headings (H1–H6), bold, italic, strikethrough, inline code, code blocks, links, images, unordered lists, ordered lists, blockquotes, and horizontal rules. Tables and footnotes are not supported.",
      },
      {
        question: "Does this tool send my content to a server?",
        answer:
          "No. All Markdown parsing and HTML generation happens entirely in your browser. Your content is never transmitted to any server.",
      },
    ],
  },
];

/* ---- Lookup helpers ---- */

export function getAllTools(): ToolMeta[] {
  return toolRegistry;
}

export function getToolBySlug(slug: string): ToolMeta | undefined {
  return toolRegistry.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: string): ToolMeta[] {
  return toolRegistry.filter((t) => t.category === category);
}

export function getFeaturedTools(): ToolMeta[] {
  return toolRegistry.filter((t) => t.featured);
}

export function getToolSlugs(): string[] {
  return toolRegistry.map((t) => t.slug);
}

export function searchTools(query: string): ToolMeta[] {
  const q = query.trim().toLowerCase();
  if (!q) return toolRegistry;
  return toolRegistry.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.keywords.some((k) => k.toLowerCase().includes(q)),
  );
}
