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
      "Convert text to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, or iNVERSE cASE instantly in your browser.",
    longDescription:
      "Transform text between different letter cases with one click. Choose from UPPERCASE, lowercase, Title Case (each word capitalized), Sentence case (first letter of each sentence capitalized), camelCase (first word lowercase, subsequent words capitalized and joined), snake_case (words joined with underscores), or iNVERSE cASE (reverse the case of each letter). All transformations happen instantly in your browser — no uploads, no sign-up.",
    category: "text",
    keywords: [
      "case converter",
      "uppercase converter",
      "lowercase converter",
      "title case converter",
      "sentence case",
      "camelCase converter",
      "snake_case converter",
      "inverse case",
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
      "camelCase and snake_case split text on spaces, hyphens, and underscores — existing camelCase words are split on capital letters for snake_case only",
    ],
    faq: [
      {
        question: "What is the difference between Title Case and Sentence case?",
        answer:
          "Title Case capitalizes the first letter of every word (e.g., \"The Quick Brown Fox\"). Sentence case only capitalizes the first letter of each sentence (e.g., \"The quick brown fox\").",
      },
      {
        question: "What is iNVERSE cASE?",
        answer:
          "iNVERSE cASE reverses the case of each letter — uppercase becomes lowercase and vice versa. For example, \"Hello World\" becomes \"hELLO wORLD\".",
      },
      {
        question: "How do camelCase and snake_case work?",
        answer:
          "camelCase joins words by capitalizing the first letter of each word except the first (e.g., \"hello world\" → \"helloWorld\"). snake_case joins words with underscores in all lowercase (e.g., \"Hello World\" → \"hello_world\"). Both split input on spaces, hyphens, and underscores.",
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
  {
    slug: "regex-tester",
    name: "RegEx Tester",
    description:
      "Test regular expressions in real time. Enter a pattern and test string, toggle flags (g, i, m, s, u, y), see highlighted matches and capturing groups — all in your browser.",
    longDescription:
      "Test and debug regular expressions with instant feedback. Enter your regex pattern and a test string, toggle modifier flags (global, case-insensitive, multiline, dotall, unicode, sticky), and see matches highlighted in real time. The tool shows the number of matches, capturing group count, and detailed match information including group captures. Syntax errors are displayed immediately. All processing happens locally using JavaScript's native RegExp engine — your input never leaves your device.",
    category: "developers",
    keywords: [
      "regex tester",
      "regular expression tester",
      "regex tester online",
      "regex pattern tester",
      "regex debugger",
      "regexp tester",
      "regex matcher",
    ],
    icon: "🔬",
    isClientSide: true,
    relatedSlugs: ["json-formatter", "epoch-timestamp-converter", "url-encoder-decoder"],
    supportedFormats: ["Regular expressions", "Plain text"],
    limitations: [
      "Uses JavaScript's native RegExp engine — lookbehind assertions may not work in older browsers",
      "Capturing group count is estimated by counting opening parentheses (may include non-capturing groups)",
    ],
    faq: [
      {
        question: "What regex flags are supported?",
        answer:
          "All standard JavaScript RegExp flags: g (global — find all matches), i (case-insensitive), m (multiline — ^ and $ match per line), s (dotall — . matches newlines), u (unicode), and y (sticky — match at lastIndex only).",
      },
      {
        question: "Does this tool use the same regex engine as my programming language?",
        answer:
          "This tool uses JavaScript's native RegExp engine, which is very similar to PCRE but has some differences. Most patterns work the same way across JavaScript, Python, and other languages, but advanced features like named groups or lookbehind may behave differently.",
      },
    ],
  },
  {
    slug: "json-xml-converter",
    name: "JSON to XML / XML to JSON Converter",
    description:
      "Convert JSON to XML and XML to JSON instantly with proper indentation and syntax validation. Dual-mode, client-side, no uploads.",
    longDescription:
      "Transform data between JSON and XML formats with a single click. Switch between JSON-to-XML and XML-to-JSOn modes, paste your data, and get properly indented, pretty-printed output instantly. JSON-to-XML mode wraps objects in elements, arrays in repeated item tags, and escapes special characters. XML-to-JSON mode uses the browser's native DOMParser to build a clean JSON tree. Syntax errors are caught and displayed immediately. All processing happens locally in your browser — your data never leaves your device.",
    category: "developers",
    keywords: [
      "json to xml",
      "xml to json",
      "json xml converter",
      "convert json to xml",
      "convert xml to json",
      "json to xml online",
      "xml to json online",
    ],
    icon: "🔄",
    isClientSide: true,
    relatedSlugs: ["json-formatter", "base64-encoder", "base64-decoder"],
    supportedFormats: ["JSON", "XML"],
    limitations: [
      "JSON-to-XML: array items are wrapped in <item> tags; root element is always <root>",
      "XML-to-JSON: attributes are not preserved — only element text and child elements are converted",
      "XML comments and processing instructions are ignored",
    ],
    faq: [
      {
        question: "How are JSON arrays converted to XML?",
        answer:
          "Each element in a JSON array becomes an <item> element inside the parent element. For example, [1, 2] becomes <root><item>1</item><item>2</item></root>.",
      },
      {
        question: "Are XML attributes preserved when converting to JSON?",
        answer:
          "No. This converter focuses on element content and structure. XML attributes are not preserved — only element text and child elements are converted to JSON properties.",
      },
    ],
  },
  {
    slug: "svg-to-png-converter",
    name: "SVG to PNG Converter",
    description:
      "Convert SVG to PNG in your browser. Paste or load an SVG, set custom width/height, keep aspect ratio, and download a high-quality PNG — no uploads.",
    longDescription:
      "Convert SVG images to PNG format directly in your browser. Paste SVG markup or load an .svg file, preview the SVG instantly, set custom output width and height in pixels, and toggle aspect ratio locking. The tool renders the SVG onto an HTML5 canvas and exports a high-quality PNG download. Original SVG dimensions are auto-detected from width/height or viewBox attributes. All processing happens locally — your files never leave your device.",
    category: "image",
    keywords: [
      "svg to png",
      "convert svg to png",
      "svg to png converter",
      "svg to png online",
      "svg converter",
      "rasterize svg",
      "svg to image",
    ],
    icon: "🖼️",
    isClientSide: true,
    relatedSlugs: ["image-to-base64", "image-resizer", "image-compressor"],
    supportedFormats: ["SVG input", "PNG output"],
    limitations: [
      "SVG must be valid XML — malformed SVG will not render",
      "External resources referenced in SVG (fonts, images) may not load due to browser security restrictions",
      "Very large output dimensions may cause memory issues in the browser",
    ],
    faq: [
      {
        question: "Can I set custom output dimensions?",
        answer:
          "Yes. You can set custom width and height in pixels. Enable the 'Keep aspect ratio' toggle to automatically maintain the original proportions when changing one dimension.",
      },
      {
        question: "Why does my SVG preview look different from the original?",
        answer:
          "If your SVG references external fonts, images, or stylesheets, the browser may not load them due to security restrictions. Inline all resources within the SVG for best results.",
      },
    ],
  },
  {
    slug: "color-palette-generator",
    name: "Color Palette Generator from Image",
    description:
      "Extract the top 5 dominant colors from any image. Upload, get beautiful color blocks with HEX/RGB codes, and copy with one click — all in your browser.",
    longDescription:
      "Generate a color palette from any image directly in your browser. Upload or drag and drop an image, and the tool uses a color quantization algorithm to extract the 5 most dominant colors. Each color is displayed as a beautiful color block showing its percentage of the image, with both HEX and RGB codes available for one-click copying. The image is downscaled for fast processing, and all computation happens locally using the HTML5 Canvas API — your image never leaves your device.",
    category: "image",
    keywords: [
      "color palette generator",
      "extract colors from image",
      "image color picker",
      "dominant colors",
      "color scheme from image",
      "hex color extractor",
      "image to color palette",
    ],
    icon: "🎨",
    isClientSide: true,
    relatedSlugs: ["image-to-base64", "svg-to-png-converter", "image-compressor"],
    supportedFormats: ["JPG", "PNG", "WebP", "GIF", "BMP"],
    limitations: [
      "Extracts exactly 5 dominant colors using bucket-based quantization",
      "Images are downscaled to 200px max dimension for processing speed",
      "Transparent pixels are ignored during color extraction",
    ],
    faq: [
      {
        question: "How does the color extraction algorithm work?",
        answer:
          "The tool downscales the image to 200px maximum dimension, then groups pixels into color buckets (32-value ranges per RGB channel). The 5 most populated buckets are averaged to produce the dominant colors, each shown with its percentage of the image.",
      },
      {
        question: "Can I copy both HEX and RGB codes?",
        answer:
          "Yes. Each color block displays both the HEX code (e.g. #FF5733) and RGB code (e.g. rgb(255, 87, 51)). Click either one to copy it to your clipboard instantly.",
      },
    ],
  },
  {
    slug: "sql-formatter",
    name: "SQL Formatter / Beautifier",
    description:
      "Format and beautify messy SQL queries with proper line breaks, indentation, and consistent keyword casing — all in your browser, no uploads.",
    longDescription:
      "Transform raw, unformatted SQL into clean, readable queries instantly. Paste your SQL and the formatter adds proper line breaks before major keywords (SELECT, FROM, WHERE, JOIN, GROUP BY, ORDER BY, etc.), applies consistent indentation, and normalizes keyword casing to uppercase, lowercase, or preserves original casing. Handles string literals, comments, subqueries, and nested parentheses. All processing happens locally in your browser — your queries never leave your device.",
    category: "developers",
    keywords: [
      "sql formatter",
      "sql beautifier",
      "format sql",
      "sql pretty print",
      "sql indent",
      "sql format online",
      "beautify sql",
    ],
    icon: "🗄️",
    isClientSide: true,
    relatedSlugs: ["json-formatter", "regex-tester", "json-xml-converter"],
    supportedFormats: ["SQL"],
    limitations: [
      "Supports standard SQL syntax — dialect-specific keywords may not be recognized",
      "Does not validate SQL syntax — only formats and beautifies",
      "Complex nested subqueries may not indent perfectly in all cases",
    ],
    faq: [
      {
        question: "Does this tool validate my SQL syntax?",
        answer:
          "No. The formatter beautifies your SQL by adding line breaks, indentation, and consistent keyword casing. It does not validate whether the SQL is syntactically correct or will execute successfully against a database.",
      },
      {
        question: "Can I choose uppercase or lowercase keywords?",
        answer:
          "Yes. You can select from three keyword casing modes: UPPERCASE (converts all keywords to uppercase), lowercase (converts all keywords to lowercase), or Preserve (keeps original casing). The default is UPPERCASE.",
      },
    ],
  },
  {
    slug: "json-validator",
    name: "JSON Validator & Linter",
    description:
      "Validate and lint JSON in real time. Get precise error locations with line numbers, or format valid JSON with 2 or 4 space indentation — all in your browser.",
    longDescription:
      "Validate and beautify JSON data instantly. Paste your JSON and the tool checks syntax in real time. If valid, it formats the JSON with clean indentation (2 or 4 spaces) and shows key count and nesting depth. If invalid, it displays the exact error message, line number, column position, and highlights the problematic line with context — making it easy to find and fix syntax errors. All processing happens locally in your browser — your data never leaves your device.",
    category: "developers",
    keywords: [
      "json validator",
      "json linter",
      "validate json",
      "json checker",
      "json syntax error",
      "json formatter",
      "json lint online",
    ],
    icon: "✅",
    isClientSide: true,
    relatedSlugs: ["json-formatter", "json-xml-converter", "sql-formatter"],
    supportedFormats: ["JSON"],
    limitations: [
      "Uses JavaScript's native JSON.parse — does not support JSON5, JSONC, or comments",
      "Error positions are extracted from the browser's error message and may vary slightly between browsers",
      "Does not validate JSON Schema or data types — only syntax validation",
    ],
    faq: [
      {
        question: "How does the error location feature work?",
        answer:
          "When JSON.parse fails, the browser provides an error message with a character position. The tool converts this position to a line number and column, then displays the exact line where the error occurred along with surrounding context so you can quickly identify and fix the issue.",
      },
      {
        question: "Can this tool validate JSON with comments (JSONC)?",
        answer:
          "No. This tool uses JavaScript's native JSON.parse, which strictly follows the JSON standard (RFC 8259). Comments, trailing commas, and unquoted keys are not valid JSON and will be reported as errors. Use a JSONC-aware tool if you need comment support.",
      },
    ],
  },
  {
    slug: "md5-hash-generator",
    name: "MD5 Hash Generator",
    description:
      "Generate MD5 hashes from text input instantly in your browser. Supports UTF-8, uppercase/lowercase toggle, and one-click copy — no uploads.",
    longDescription:
      "Compute MD5 cryptographic hashes from any text directly in your browser. The tool uses a pure JavaScript MD5 implementation that properly handles UTF-8 encoded text, including Cyrillic, emoji, and other multi-byte characters. Toggle between lowercase and uppercase hex output, and copy the hash to your clipboard with one click. All processing happens locally — your text never leaves your device.",
    category: "developers",
    keywords: [
      "md5 hash generator",
      "md5 hash",
      "generate md5",
      "md5 online",
      "md5 checksum",
      "md5 converter",
      "text to md5",
    ],
    icon: "#️⃣",
    isClientSide: true,
    relatedSlugs: ["base64-encoder", "base64-decoder", "uuid-generator"],
    supportedFormats: ["Plain text", "UTF-8"],
    limitations: [
      "MD5 is not cryptographically secure — do not use for password storage or security-sensitive applications",
      "Computes hash for text only — file hashing is not supported",
      "Uses a pure JavaScript implementation, not the native Web Crypto API (which does not support MD5)",
    ],
    faq: [
      {
        question: "Is MD5 secure for password hashing?",
        answer:
          "No. MD5 is considered cryptographically broken and should not be used for password storage or any security-sensitive purpose. Use bcrypt, Argon2, or PBKDF2 for password hashing. MD5 is still useful for checksums, file integrity verification, and non-security applications.",
      },
      {
        question: "Does this tool handle UTF-8 text correctly?",
        answer:
          "Yes. The tool uses the TextEncoder API to encode input as UTF-8 before computing the MD5 hash. This ensures that Cyrillic characters, emoji, accented letters, and other multi-byte characters produce the correct MD5 hash.",
      },
    ],
  },
  {
    slug: "sha256-hash-generator",
    name: "SHA-256 Hash Generator",
    description:
      "Generate SHA-256 hashes from text or files using the Web Crypto API. Drag and drop files, live text hashing, uppercase toggle, one-click copy — all in your browser.",
    longDescription:
      "Compute SHA-256 cryptographic hashes securely in your browser using the native Web Crypto API (crypto.subtle.digest). The tool supports two modes: text mode with live hashing as you type, and file mode with a drag-and-drop drop zone for hashing any file. Toggle between lowercase and uppercase hex output, and copy the hash to your clipboard with one click. SHA-256 is part of the SHA-2 family and is widely used for data integrity verification, digital signatures, and blockchain applications. All processing happens locally — your data never leaves your device.",
    category: "developers",
    keywords: [
      "sha256 hash generator",
      "sha-256 hash",
      "generate sha256",
      "sha256 online",
      "sha256 checksum",
      "sha256 file hash",
      "sha-2 hash",
    ],
    icon: "🔐",
    isClientSide: true,
    relatedSlugs: ["md5-hash-generator", "base64-encoder", "uuid-generator"],
    supportedFormats: ["Plain text", "Any file"],
    limitations: [
      "Requires a browser that supports the Web Crypto API (all modern browsers do)",
      "File mode reads the entire file into memory — very large files may cause memory issues",
      "Only SHA-256 is supported — for other algorithms (SHA-1, SHA-512), use a dedicated tool",
    ],
    faq: [
      {
        question: "What is the difference between MD5 and SHA-256?",
        answer:
          "MD5 produces a 128-bit hash and is considered cryptographically broken. SHA-256 produces a 256-bit hash and is part of the SHA-2 family, which is still considered secure for most applications. SHA-256 is recommended for security-sensitive use cases, while MD5 should only be used for non-security purposes like checksums.",
      },
      {
        question: "Can I hash files with this tool?",
        answer:
          "Yes. Switch to file mode and drag and drop any file onto the drop zone, or click to browse. The tool reads the file and computes its SHA-256 hash using the Web Crypto API. The file is processed entirely in your browser and never uploaded to a server.",
      },
    ],
  },
  {
    slug: "password-strength-meter",
    name: "Password Strength Meter & Validator",
    description:
      "Evaluate password strength with entropy scoring, security checklist, estimated crack time, and visual strength bars — all client-side, your password never leaves your device.",
    longDescription:
      "Analyze your password's strength in real time without ever transmitting it anywhere. The tool calculates Shannon entropy based on character set size and password length, checks against a database of common passwords, and provides a detailed security checklist (length ≥ 12, uppercase, lowercase, numbers, symbols, not commonly used). It estimates brute-force crack time assuming 10 billion guesses per second, displays a visual 5-bar strength meter, and provides a threat-level report. All processing happens locally in your browser — your password is never sent to any server.",
    category: "security",
    keywords: [
      "password strength meter",
      "password validator",
      "password checker",
      "test password strength",
      "password entropy",
      "password security check",
      "how strong is my password",
    ],
    icon: "🔒",
    isClientSide: true,
    relatedSlugs: ["password-generator", "md5-hash-generator", "sha256-hash-generator"],
    supportedFormats: ["Plain text"],
    limitations: [
      "Entropy estimation is based on character set size and length — does not detect dictionary words or patterns",
      "Crack time assumes 10 billion guesses per second (offline attack) — actual time varies by attacker resources",
      "Common password list is limited to ~40 entries — not a comprehensive dictionary attack simulation",
    ],
    faq: [
      {
        question: "Is it safe to type my real password into this tool?",
        answer:
          "Yes. The tool runs entirely in your browser using client-side JavaScript. Your password is never transmitted to any server, stored, or logged. You can also verify this by checking your browser's network tab — no requests are made when you type.",
      },
      {
        question: "How is the entropy score calculated?",
        answer:
          "Entropy is calculated as password length × log2(character set size). The character set includes lowercase (26), uppercase (26), digits (10), and symbols (33). For example, a 12-character password using all four sets has entropy of 12 × log2(95) ≈ 78.8 bits.",
      },
    ],
  },
  {
    slug: "url-parser",
    name: "URL Parser & Decoder",
    description:
      "Break down any URL into protocol, hostname, path, port, hash, and query parameters. Edit and delete query pairs instantly in your browser.",
    longDescription:
      "Paste any URL and instantly see its components: protocol, hostname, port, path, hash, and all query parameters as editable key-value pairs. Delete individual query parameters with one click. All parsing happens locally in your browser — no data is sent to any server.",
    category: "developers",
    keywords: [
      "url parser",
      "url decoder",
      "query string parser",
      "url breakdown",
      "url inspector",
      "query parameters",
      "url components",
    ],
    icon: "🔗",
    isClientSide: true,
    relatedSlugs: ["url-encoder-decoder", "base64-encoder", "base64-decoder"],
    supportedFormats: ["Any valid URL"],
    limitations: [
      "Only valid URLs with protocol (http://, https://, etc.) can be parsed",
      "Query parameters are decoded but not re-encoded when deleted",
    ],
    faq: [
      {
        question: "What URL formats are supported?",
        answer:
          "Any valid URL with a protocol (http://, https://, ftp://, etc.) can be parsed. The tool uses the browser's native URL API for accurate parsing.",
      },
      {
        question: "Can I edit query parameters?",
        answer:
          "Yes. You can delete individual query parameters by clicking the delete button next to each pair. The tool shows all parameters as editable key-value pairs.",
      },
    ],
  },
  {
    slug: "html-stripper",
    name: "HTML Tag Stripper",
    description: "Remove HTML tags from any markup, leaving clean text. Option to preserve line breaks from block elements.",
    longDescription: "Clean HTML markup by stripping all tags and leaving only raw text. Choose between completely removing tags or converting block-level tags (br, p, div, li) to line breaks for better readability. All processing happens in your browser.",
    category: "text",
    keywords: ["html stripper", "tag remover", "strip html", "remove tags", "html to text", "clean html"],
    icon: "🧹",
    isClientSide: true,
    relatedSlugs: ["markdown-to-html", "text-replacer", "case-converter"],
    supportedFormats: ["HTML markup"],
    limitations: ["Does not parse or validate HTML — uses regex-based tag removal", "Script and style tag contents are not removed (only the tags themselves)"],
    faq: [
      { question: "Does this remove script contents?", answer: "No. The tool removes HTML tags using regex. The content inside <script> or <style> tags will remain. For full HTML parsing, use a DOM-based approach." },
      { question: "What does the 'Preserve line breaks' mode do?", answer: "It converts block-level closing tags (</p>, </div>, </li>, <br>) to newlines before stripping all remaining tags, preserving paragraph structure as line breaks." },
    ],
  },
  {
    slug: "url-slug-generator",
    name: "URL Slug Generator",
    description: "Convert text into URL-safe slugs. Lowercased, spaces to hyphens, special chars stripped, with Cyrillic transliteration.",
    longDescription: "Generate clean, SEO-friendly URL slugs from any text. The tool lowercases the input, replaces spaces with hyphens, removes special characters, and transliterates Cyrillic characters to Latin (e.g., 'привет' → 'privet'). All processing is client-side.",
    category: "text",
    keywords: ["url slug", "slug generator", "slugify", "permalink", "url friendly", "seo slug", "cyrillic transliteration"],
    icon: "🔗",
    isClientSide: true,
    relatedSlugs: ["url-parser", "url-encoder-decoder", "case-converter"],
    supportedFormats: ["Plain text"],
    limitations: ["Transliteration supports Russian Cyrillic only — other Cyrillic characters are stripped", "Consecutive hyphens are collapsed into one"],
    faq: [
      { question: "How does Cyrillic transliteration work?", answer: "Each Cyrillic character is mapped to its Latin equivalent (e.g., 'я' → 'ya', 'ж' → 'zh'). This produces readable slugs from Russian text without manual conversion." },
      { question: "What characters are kept in the slug?", answer: "Only lowercase letters (a-z), digits (0-9), and hyphens are kept. All other characters are removed. Spaces are converted to hyphens." },
    ],
  },
  {
    slug: "text-replacer",
    name: "Text Replacer",
    description: "Find and replace text in large blocks. Supports case-sensitive matching and regex patterns.",
    longDescription: "Mass find-and-replace tool for text. Enter a search phrase and replacement, toggle case sensitivity, or enable regex mode for pattern-based replacements. All processing happens locally in your browser.",
    category: "text",
    keywords: ["text replacer", "find and replace", "replace text", "regex replace", "search replace", "text finder"],
    icon: "🔄",
    isClientSide: true,
    relatedSlugs: ["text-prefix-suffix", "case-converter", "html-stripper"],
    supportedFormats: ["Plain text"],
    limitations: ["Regex errors will display an error message instead of output", "No undo/history — keep your original text safe"],
    faq: [
      { question: "Can I use regular expressions?", answer: "Yes. Enable the 'Use Regex' toggle to treat the find field as a regex pattern. All JavaScript regex features are supported, including capture groups in the replacement string." },
      { question: "Is the matching case-sensitive by default?", answer: "No. By default, matching is case-insensitive. Enable the 'Case sensitive' toggle for exact case matching." },
    ],
  },
  {
    slug: "number-base-converter",
    name: "Number Base Converter",
    description: "Convert numbers between Binary, Octal, Decimal, Hexadecimal, and Base 36 with live updates.",
    longDescription: "Interactively convert numbers between common bases: Binary (base 2), Octal (base 8), Decimal (base 10), Hexadecimal (base 16), and Base 36. Type in any field and all others update instantly. All calculations happen in your browser.",
    category: "calculators",
    keywords: ["number base converter", "binary to decimal", "hex to decimal", "octal converter", "base 36", "radix converter", "binary converter"],
    icon: "🔢",
    isClientSide: true,
    relatedSlugs: ["binary-text-converter", "hex-rgb-converter", "percentage-calculator"],
    supportedFormats: ["Numbers"],
    limitations: ["Supports integers only — fractional numbers are not supported", "Maximum value is limited by JavaScript's number precision (2^53)"],
    faq: [
      { question: "What is Base 36?", answer: "Base 36 uses digits 0-9 and letters A-Z to represent numbers. It's the highest base that can be represented with alphanumeric characters in a case-insensitive manner." },
      { question: "Can I convert fractional numbers?", answer: "No. This tool supports integer conversion only. Fractional number base conversion requires a different algorithm." },
    ],
  },
  {
    slug: "hex-rgb-converter",
    name: "HEX to RGB Converter",
    description: "Convert colors between HEX, RGB, HSL, and CMYK formats in real time. Includes color picker.",
    longDescription: "Real-time color format converter. Pick a color or enter a HEX code, and instantly see RGB, HSL, and CMYK representations. All conversions happen locally in your browser.",
    category: "design",
    keywords: ["hex to rgb", "rgb to hex", "color converter", "hsl converter", "cmyk converter", "color picker", "color format"],
    icon: "🎨",
    isClientSide: true,
    relatedSlugs: ["color-palette-generator", "number-base-converter"],
    supportedFormats: ["HEX color codes"],
    limitations: ["HEX input must be 3 or 6 character hex codes (with or without #)", "CMYK conversion is approximate for display purposes"],
    faq: [
      { question: "What color formats are supported?", answer: "HEX, RGB (e.g., rgb(52, 152, 219)), HSL (e.g., hsl(204, 70%, 53%)), and CMYK (e.g., cmyk(76%, 30%, 0%, 14%))." },
      { question: "Can I use 3-digit HEX codes?", answer: "Yes. 3-digit HEX codes (like #fff) are automatically expanded to 6-digit equivalents (#ffffff)." },
    ],
  },
  {
    slug: "jwt-decoder",
    name: "JWT Debugger & Decoder",
    description: "Decode JWT tokens to inspect header and payload. See expiration status with Active/Expired badge.",
    longDescription: "Paste a JWT (JSON Web Token) to instantly decode its header and payload as formatted JSON. The tool checks the 'exp' claim and displays an Active/Expired badge with the expiration date. All decoding happens client-side — your token never leaves your browser.",
    category: "developers",
    keywords: ["jwt decoder", "jwt debugger", "json web token", "token decoder", "jwt inspector", "base64 decode jwt"],
    icon: "🔑",
    isClientSide: true,
    relatedSlugs: ["url-parser", "base64-decoder", "base64-encoder"],
    supportedFormats: ["JWT tokens"],
    limitations: ["Only decodes header and payload — does not verify signature", "Expiration check only works if the 'exp' claim is present in the payload"],
    faq: [
      { question: "Does this verify the JWT signature?", answer: "No. This tool only decodes the header and payload (which are Base64-encoded JSON). Signature verification requires the secret/public key, which is not available client-side." },
      { question: "Is it safe to paste my JWT here?", answer: "Yes. All decoding happens in your browser using JavaScript's atob function. No data is transmitted to any server." },
    ],
  },
  {
    slug: "morse-code-translator",
    name: "Morse Code Translator",
    description: "Encode text to Morse code or decode Morse code back to text. Supports letters, numbers, and punctuation.",
    longDescription: "Bidirectional Morse code converter. Encode any text into international Morse code (dots and dashes), or paste Morse code to decode it back to readable text. Supports A-Z, 0-9, and common punctuation marks. All processing is client-side.",
    category: "text",
    keywords: ["morse code", "morse translator", "morse encoder", "morse decoder", "dots and dashes", "international morse code"],
    icon: "📡",
    isClientSide: true,
    relatedSlugs: ["binary-text-converter", "case-converter", "text-replacer"],
    supportedFormats: ["Plain text", "Morse code"],
    limitations: ["Morse code is case-insensitive — all output is uppercase", "Unsupported characters are silently skipped during encoding"],
    faq: [
      { question: "What characters are supported?", answer: "Letters A-Z, digits 0-9, and common punctuation (. , ? ! / ( ) & @ = + - _ \" : ;) are supported. Spaces between words are represented as /." },
      { question: "How do I decode Morse code?", answer: "Switch to decode mode and paste Morse code with spaces between characters and / between words. For example, '.... . .-.. .-.. --- / .-- --- .-. .-.. -..' decodes to 'HELLO WORLD'." },
    ],
  },
  {
    slug: "binary-text-converter",
    name: "Binary Text Converter",
    description: "Encode text into binary (0s and 1s) or decode binary back to readable text. Supports full Unicode.",
    longDescription: "Convert text to space-separated 8-bit binary values, or translate binary sequences back to human-readable text. Supports multi-byte Unicode characters. All processing happens in your browser.",
    category: "developers",
    keywords: ["binary converter", "text to binary", "binary to text", "binary encoder", "binary decoder", "0 1 converter"],
    icon: "💾",
    isClientSide: true,
    relatedSlugs: ["morse-code-translator", "number-base-converter", "base64-encoder"],
    supportedFormats: ["Plain text", "Binary strings"],
    limitations: ["Binary input must be space-separated 8-bit values for decoding", "Invalid binary sequences will produce error output"],
    faq: [
      { question: "How is text encoded to binary?", answer: "Each character is converted to its Unicode code point and represented as an 8-bit binary number. For example, 'A' (code point 65) becomes '01000001'." },
      { question: "Can I decode binary without spaces?", answer: "No. The decoder requires spaces between 8-bit values to correctly separate characters. Ensure your binary input is space-separated." },
    ],
  },
  {
    slug: "text-prefix-suffix",
    name: "Text Prefix & Suffix Appender",
    description: "Add custom prefix and/or suffix to every line of text. Option to skip empty lines.",
    longDescription: "Loop over each line of your text and append a custom prefix to the beginning and/or a suffix to the end. Toggle skipping empty lines. Useful for adding quotes, commas, HTML tags, or code syntax to list items. All processing is client-side.",
    category: "text",
    keywords: ["prefix suffix", "add prefix", "add suffix", "text appender", "line prefix", "line suffix", "bulk text editor"],
    icon: "➕",
    isClientSide: true,
    relatedSlugs: ["text-replacer", "text-sorter", "remove-duplicate-lines"],
    supportedFormats: ["Plain text"],
    limitations: ["Prefix and suffix are added as literal strings — no regex or pattern support"],
    faq: [
      { question: "Can I add only a prefix or only a suffix?", answer: "Yes. Leave the prefix or suffix field empty to add only one of them. Both fields can also be used simultaneously." },
      { question: "What does 'Skip empty lines' do?", answer: "When enabled, empty lines (lines with no content or only whitespace) are left unchanged. When disabled, prefix and suffix are added to every line including empty ones." },
    ],
  },
  {
    slug: "list-randomizer",
    name: "List Randomizer & Picker",
    description: "Shuffle list items randomly, pick N unique items, remove empty lines. Download or copy results.",
    longDescription: "Randomize your lists with three operations: shuffle all entries randomly, pick 1 or N unique items from the list, and remove empty lines before processing. All randomization happens client-side using the Fisher-Yates shuffle algorithm.",
    category: "text",
    keywords: ["list randomizer", "shuffle list", "random picker", "random choice", "list shuffler", "pick random item", "randomize list"],
    icon: "🎲",
    isClientSide: true,
    relatedSlugs: ["text-sorter", "remove-duplicate-lines", "text-prefix-suffix"],
    supportedFormats: ["Multi-line text"],
    limitations: ["Uses Math.random() — not cryptographically secure", "Pick count cannot exceed the number of non-empty items"],
    faq: [
      { question: "Is the shuffle truly random?", answer: "The tool uses the Fisher-Yates shuffle algorithm with Math.random(). This is suitable for general use but not for cryptographic purposes." },
      { question: "How does the pick count work?", answer: "After shuffling, the first N items are selected as the 'picked' results. If you request more items than available, all items are returned." },
    ],
  },
  {
    slug: "user-agent-parser",
    name: "User Agent Parser",
    description: "Parse User-Agent strings to extract browser name, OS, device type, and rendering engine. All client-side.",
    longDescription: "Evaluate any User-Agent string to extract detailed information: browser name (Chrome, Firefox, Safari, Edge, Opera), operating system (Windows, macOS, Linux, Android, iOS), device type (mobile/desktop), and rendering engine (Blink, Gecko, WebKit). All parsing happens locally in your browser.",
    category: "developers",
    keywords: ["user agent parser", "ua parser", "browser detection", "os detection", "device type", "rendering engine", "navigator useragent"],
    icon: "🖥️",
    isClientSide: true,
    relatedSlugs: ["jwt-decoder", "url-parser", "regex-tester"],
    supportedFormats: ["User-Agent strings"],
    limitations: ["User-Agent strings can be spoofed — results may not reflect the actual browser", "Detection is based on regex patterns — new or uncommon browsers may show as Unknown"],
    faq: [
      { question: "Can I parse a custom User-Agent string?", "answer": "Yes. The tool pre-fills with your current browser's User-Agent, but you can edit the field to parse any string." },
      { question: "How accurate is the detection?", "answer": "The tool uses regex pattern matching against common User-Agent formats. It correctly identifies major browsers and operating systems, but may show 'Unknown' for rare or spoofed agents." },
    ],
  },
  {
    slug: "html-encoder-decoder",
    name: "HTML Encoder/Decoder",
    description: "Encode HTML special characters to entities or decode entities back to HTML. All client-side.",
    longDescription: "Convert HTML special characters (& < > \" ') to their entity equivalents (&amp; &lt; &gt; &quot; &#39;) or reverse the process. Useful for safely displaying HTML code in web pages. All processing happens in your browser.",
    category: "developers",
    keywords: ["html encoder", "html decoder", "html entities", "escape html", "unescape html", "entity encoder"],
    icon: "🔐",
    isClientSide: true,
    relatedSlugs: ["html-stripper", "base64-encoder", "base64-decoder", "url-encoder-decoder"],
    supportedFormats: ["HTML text"],
    limitations: ["Only encodes/decodes the 5 core HTML entities (& < > \" ')", "Does not encode numeric entities like &#60; or named entities like &nbsp;"],
    faq: [
      { question: "Which characters are encoded?", "answer": "The tool encodes the 5 HTML special characters: & (< to &amp;), < (to &lt;), > (to &gt;), \" (to &quot;), and ' (to &#39;)." },
      { question: "Why encode HTML?", "answer": "Encoding prevents HTML injection (XSS) by converting special characters to their entity equivalents. This ensures that user input is displayed as text rather than interpreted as HTML markup." },
    ],
  },
  {
    slug: "csv-json-converter",
    name: "CSV to JSON Converter",
    description: "Convert CSV data to JSON objects and vice versa. Supports comma, semicolon, and tab delimiters.",
    longDescription: "Transform flat CSV data into structured JSON arrays and back. Choose your delimiter (comma, semicolon, or tab). The first row is treated as headers when converting CSV to JSON. All processing happens locally in your browser.",
    category: "developers",
    keywords: ["csv to json", "json to csv", "csv converter", "json converter", "csv parser", "data converter", "delimiter"],
    icon: "📊",
    isClientSide: true,
    relatedSlugs: ["json-formatter", "json-validator", "xml-formatter"],
    supportedFormats: ["CSV", "JSON"],
    limitations: ["CSV parsing does not handle quoted fields containing delimiters", "JSON to CSV only works with arrays of flat objects — nested objects are stringified"],
    faq: [
      { question: "How are CSV headers handled?", "answer": "When converting CSV to JSON, the first row is used as object keys. Each subsequent row becomes an object with those keys." },
      { question: "Can I use different delimiters?", "answer": "Yes. You can choose between comma (,), semicolon (;), or tab as the delimiter for both conversion directions." },
    ],
  },
  {
    slug: "xml-formatter",
    name: "XML Formatter & Validator",
    description: "Format and beautify XML with proper indentation, or minify XML by removing whitespace. All client-side.",
    longDescription: "Parse raw XML and format it cleanly with standard tag indentation, or collapse everything into a minified string. The beautifier adds consistent 2-space indentation around nested elements. All processing happens in your browser.",
    category: "developers",
    keywords: ["xml formatter", "xml beautifier", "xml minifier", "xml pretty print", "format xml", "indent xml"],
    icon: "📋",
    isClientSide: true,
    relatedSlugs: ["json-formatter", "json-xml-converter", "css-minifier"],
    supportedFormats: ["XML"],
    limitations: ["Formatting uses regex-based approach — may not handle all XML edge cases", "Does not validate XML schema or DTD"],
    faq: [
      { question: "Does this validate XML?", "answer": "The tool formats XML using regex-based parsing. It does not perform full XML schema validation. For strict validation, use a dedicated XML validator." },
      { question: "What does minify do?", "answer": "Minify removes all unnecessary whitespace between tags, creating a compact single-line XML string suitable for production use." },
    ],
  },
  {
    slug: "css-minifier",
    name: "CSS Minifier & Beautifier",
    description: "Beautify CSS with clean indentation or minify by stripping comments, whitespace, and trailing semicolons.",
    longDescription: "Optimize raw CSS with dual actions: Beautify (format curly braces, clean indentations, nested rules) and Minify (strip comments, whitespace, trailing semicolons). All processing happens locally in your browser.",
    category: "design",
    keywords: ["css minifier", "css beautifier", "css formatter", "minify css", "compress css", "css optimizer"],
    icon: "🎯",
    isClientSide: true,
    relatedSlugs: ["xml-formatter", "json-formatter", "contrast-checker"],
    supportedFormats: ["CSS"],
    limitations: ["Beautifier uses regex-based formatting — may not handle all CSS preprocessing syntax", "Minifier removes all comments including important ones"],
    faq: [
      { question: "What does minify remove?", "answer": "Minify removes all CSS comments, extra whitespace, and unnecessary semicolons/colons to create the smallest possible CSS string." },
      { question: "Can this handle SCSS/SASS?", "answer": "The tool is designed for standard CSS. SCSS/SASS-specific syntax like nesting and variables may not be formatted correctly." },
    ],
  },
  {
    slug: "contrast-checker",
    name: "Color Contrast Checker",
    description: "Check WCAG 2.1 contrast ratios between foreground and background colors. Shows Pass/Fail for AA and AAA.",
    longDescription: "Compute exact contrast ratio between foreground and background colors using standard WCAG 2.1 formulas. The tool displays Pass/Fail badges for AA (Normal, Large) and AAA (Normal, Large) compliance levels, along with a live preview. All calculations happen in your browser.",
    category: "design",
    keywords: ["contrast checker", "wcag", "accessibility", "color contrast", "aa aaa", "wcag 2.1", "web accessibility"],
    icon: "👁️",
    isClientSide: true,
    relatedSlugs: ["hex-rgb-converter", "color-palette-generator", "css-minifier"],
    supportedFormats: ["HEX color codes"],
    limitations: ["Only supports HEX color input — RGB/HSL inputs are not supported", "WCAG thresholds are based on the standard 2.1 specification"],
    faq: [
      { question: "What are the WCAG thresholds?", "answer": "AA Normal: 4.5:1, AA Large: 3:1, AAA Normal: 7:1, AAA Large: 4.5:1. Large text is defined as 18pt (24px) or 14pt bold (18.66px bold)." },
      { question: "Why is contrast important?", "answer": "Sufficient contrast ensures text is readable for users with visual impairments. WCAG compliance is required for accessibility standards in many jurisdictions." },
    ],
  },
  {
    slug: "loan-calculator",
    name: "Loan Calculator",
    description: "Calculate monthly payments, total interest, and total cost for loans. Enter principal, rate, and term.",
    longDescription: "Compute monthly repayments, total interest, and aggregate lifetime cost of loans based on principal amount, annual interest rate, and loan term in years. Uses the standard amortization formula. All calculations happen in your browser.",
    category: "calculators",
    keywords: ["loan calculator", "mortgage calculator", "monthly payment", "interest calculator", "amortization", "loan repayment"],
    icon: "💰",
    isClientSide: true,
    relatedSlugs: ["percentage-calculator", "discount-calculator", "bmi-calculator"],
    supportedFormats: ["Numbers"],
    limitations: ["Uses fixed-rate amortization formula — does not support variable-rate loans", "Does not account for fees, taxes, or insurance"],
    faq: [
      { question: "What formula is used?", "answer": "The tool uses the standard amortization formula: M = P × (r(1+r)^n) / ((1+r)^n - 1), where P is principal, r is monthly rate, and n is total months." },
      { question: "Does this include fees or taxes?", "answer": "No. The calculator only computes principal and interest. Real-world loans may include additional costs like property taxes, insurance, and origination fees." },
    ],
  },
  {
    slug: "text-line-counter",
    name: "Text Line Counter & Trimmer",
    description: "Count lines, trim whitespace, remove empty lines, and truncate lines by character count. All client-side.",
    longDescription: "Process multi-line text with multiple operations: count total lines, trim leading/trailing whitespace from each line, remove empty lines, and truncate lines to a maximum character count. All processing happens in your browser.",
    category: "text",
    keywords: ["line counter", "text trimmer", "remove empty lines", "truncate lines", "line count", "text cleaner"],
    icon: "📏",
    isClientSide: true,
    relatedSlugs: ["text-sorter", "remove-duplicate-lines", "text-prefix-suffix"],
    supportedFormats: ["Multi-line text"],
    limitations: ["Truncation is by character count — does not consider word boundaries", "Trim only removes leading/trailing whitespace, not internal spaces"],
    faq: [
      { question: "What does 'Trim' do?", "answer": "Trim removes leading and trailing whitespace (spaces, tabs) from each line. Internal spaces within the line content are preserved." },
      { question: "How does 'Max chars per line' work?", "answer": "When set to a value greater than 0, each line is truncated to that maximum character count. Lines shorter than the limit are not affected." },
    ],
  },
  {
    slug: "cron-expression-generator",
    name: "Cron Expression Generator",
    description: "Build cron schedule expressions visually with dropdown menus. Generates standard 5-part cron syntax with human-readable description.",
    longDescription: "Create cron expressions with an intuitive visual builder. Select minute, hour, day, month, and weekday values from dropdown menus. The tool generates the standard 5-part cron string and a human-readable description of the schedule. All processing happens in your browser.",
    category: "developers",
    keywords: ["cron expression", "cron generator", "crontab", "schedule builder", "cron syntax", "job scheduler"],
    icon: "⏰",
    isClientSide: true,
    relatedSlugs: ["epoch-timestamp-converter", "date-calculator", "jwt-decoder"],
    supportedFormats: ["Cron expressions"],
    limitations: ["Only supports standard 5-part cron syntax (minute hour day month weekday)", "Does not support special characters like @daily or @reboot"],
    faq: [
      { question: "What is cron syntax?", answer: "Cron is a time-based job scheduler. The 5 fields are: minute (0-59), hour (0-23), day of month (1-31), month (1-12), and day of week (0-7 where 0 and 7 are Sunday)." },
      { question: "What does * mean in cron?", answer: "An asterisk (*) means 'every' — e.g., * in the minute field means every minute. */5 means every 5 minutes." },
    ],
  },
  {
    slug: "css-gradient-generator",
    name: "CSS Gradient Generator",
    description: "Create beautiful CSS gradients visually. Linear and radial modes, multi-color stops, angle control, live preview, and one-click copy.",
    longDescription: "Design modern CSS gradients with an interactive visual editor. Choose linear or radial gradients, add up to 3 color stops, adjust the angle for linear gradients, and see a live preview. Copy the generated CSS code with one click. All processing happens in your browser.",
    category: "design",
    keywords: ["css gradient", "gradient generator", "linear gradient", "radial gradient", "css gradient code", "gradient maker"],
    icon: "🌈",
    isClientSide: true,
    relatedSlugs: ["css-minifier", "css-box-shadow-generator", "contrast-checker", "hex-rgb-converter"],
    supportedFormats: ["CSS"],
    limitations: ["Supports up to 3 color stops", "Does not support conic gradients"],
    faq: [
      { question: "What gradient types are supported?", answer: "Linear gradients (with adjustable angle 0-360°) and radial gradients (circle shape). Conic gradients are not currently supported." },
      { question: "Can I use more than 3 colors?", answer: "The current version supports up to 3 color stops. You can toggle the third color on or off. For more complex gradients, you can manually edit the generated CSS." },
    ],
  },
  {
    slug: "sales-tax-calculator",
    name: "Sales Tax / VAT Calculator",
    description: "Calculate net, tax, and gross amounts. Supports tax-inclusive and tax-exclusive modes with adjustable rates.",
    longDescription: "Compute sales tax or VAT with flexible modes. Enter an amount and tax rate, then choose tax-inclusive (amount includes tax) or tax-exclusive (tax added on top). The tool shows net amount, tax amount, and gross total. All calculations happen in your browser.",
    category: "calculators",
    keywords: ["sales tax calculator", "vat calculator", "tax inclusive", "tax exclusive", "net gross calculator", "tax rate"],
    icon: "🧾",
    isClientSide: true,
    relatedSlugs: ["percentage-calculator", "discount-calculator", "loan-calculator"],
    supportedFormats: ["Numbers"],
    limitations: ["Uses a single flat tax rate — does not support tiered or compound tax", "Does not account for tax exemptions or reduced rates"],
    faq: [
      { question: "What is the difference between tax-inclusive and tax-exclusive?", answer: "Tax-exclusive means the tax is added on top of the entered amount. Tax-inclusive means the entered amount already includes the tax, and the tool calculates the net (pre-tax) amount." },
      { question: "Can I use multiple tax rates?", answer: "No. The calculator supports a single flat tax rate. For compound taxes (e.g., federal + state), you would need to combine the rates manually." },
    ],
  },
  {
    slug: "random-choice-picker",
    name: "Random Choice Picker",
    description: "Enter choices and let the tool pick one randomly. Simple decision helper with spinning animation.",
    longDescription: "A decision helper tool. Enter your choices separated by commas or new lines, click the pick button, and the tool randomly selects a winner with a spinning animation. All randomization happens client-side.",
    category: "generators",
    keywords: ["random choice", "decision maker", "random picker", "wheel of fortune", "random selector", "pick random"],
    icon: "🎲",
    isClientSide: true,
    relatedSlugs: ["list-randomizer", "random-number-generator", "random-string-generator"],
    supportedFormats: ["Text"],
    limitations: ["Uses Math.random() — not cryptographically secure", "Choices must be separated by commas or new lines"],
    faq: [
      { question: "How are choices separated?", answer: "Choices can be separated by commas or new lines. Empty entries are automatically filtered out." },
      { question: "Is the selection truly random?", answer: "The tool uses Math.random() for selection. This is suitable for casual decision-making but not for cryptographic purposes." },
    ],
  },
  {
    slug: "css-box-shadow-generator",
    name: "CSS Box Shadow Generator",
    description: "Create CSS box-shadow rules visually with sliders. Control offsets, blur, spread, color, opacity, and inset. Live preview.",
    longDescription: "Design CSS box-shadow effects with an interactive slider editor. Adjust horizontal/vertical offsets, blur radius, spread distance, shadow color, opacity, and toggle inset. See a live preview and copy the generated CSS. All processing happens in your browser.",
    category: "design",
    keywords: ["css box shadow", "box shadow generator", "css shadow", "box-shadow code", "shadow maker", "inset shadow"],
    icon: "📦",
    isClientSide: true,
    relatedSlugs: ["css-gradient-generator", "css-minifier", "contrast-checker"],
    supportedFormats: ["CSS"],
    limitations: ["Generates a single box-shadow layer — multiple layered shadows require manual editing", "Color opacity is controlled separately from the color picker"],
    faq: [
      { question: "Can I create multiple shadows?", answer: "The tool generates a single box-shadow. For layered shadows, you can manually combine multiple shadow definitions separated by commas in the CSS." },
      { question: "What does inset do?", answer: "Inset creates an inner shadow that appears inside the element's border, giving a pressed-in effect." },
    ],
  },
  {
    slug: "data-size-converter",
    name: "Data Size Unit Converter",
    description: "Convert between bits, bytes, KB, MB, GB, TB, and PB. Supports both base-2 (1024) and base-10 (1000) conversions.",
    longDescription: "Convert data size units instantly. Enter a value and select a unit to see all equivalent values across bits, bytes, Kilobytes, Megabytes, Gigabytes, Terabytes, and Petabytes. Toggle between base-2 (1024) and base-10 (1000) conversions. All calculations happen in your browser.",
    category: "unit",
    keywords: ["data size converter", "bytes to kb", "kb to mb", "mb to gb", "data unit converter", "bit byte converter", "base 2 base 10"],
    icon: "💾",
    isClientSide: true,
    relatedSlugs: ["unit-converter", "length-converter", "weight-converter", "temperature-converter"],
    supportedFormats: ["Numbers"],
    limitations: ["Only supports integer bit/byte multiples — fractional bytes are not meaningful", "Petabyte results may show in exponential notation for very large values"],
    faq: [
      { question: "What is the difference between base-2 and base-10?", answer: "Base-2 uses 1024 as the multiplier (1 KB = 1024 bytes, KiB). Base-10 uses 1000 (1 KB = 1000 bytes, kB). Storage manufacturers typically use base-10, while operating systems often use base-2." },
      { question: "What units are supported?", answer: "Bits (b), Bytes (B), Kilobytes (KB), Megabytes (MB), Gigabytes (GB), Terabytes (TB), and Petabytes (PB)." },
    ],
  },
  {
    slug: "temperature-converter",
    name: "Temperature Converter",
    description: "Convert between Celsius, Fahrenheit, and Kelvin in real time. All fields update simultaneously.",
    longDescription: "Convert temperatures between Celsius (°C), Fahrenheit (°F), and Kelvin (K) instantly. Type in any field and all others update in real time. All calculations happen in your browser.",
    category: "unit",
    keywords: ["temperature converter", "celsius to fahrenheit", "fahrenheit to celsius", "kelvin converter", "celsius to kelvin", "temperature calculator"],
    icon: "🌡️",
    isClientSide: true,
    relatedSlugs: ["unit-converter", "length-converter", "weight-converter", "data-size-converter"],
    supportedFormats: ["Numbers"],
    limitations: ["Only supports Celsius, Fahrenheit, and Kelvin — Rankine and Réaumur are not supported"],
    faq: [
      { question: "What formulas are used?", answer: "Fahrenheit = Celsius × 9/5 + 32. Kelvin = Celsius + 273.15. All conversions go through Celsius as the intermediate unit." },
      { question: "Can I convert negative temperatures?", answer: "Yes. The tool handles negative values correctly. Note that 0K (-273.15°C) is absolute zero." },
    ],
  },
  {
    slug: "length-converter",
    name: "Length & Distance Converter",
    description: "Convert between metric and imperial length units: mm, cm, m, km, inches, feet, yards, and miles.",
    longDescription: "Convert length and distance measurements across metric and imperial units. Enter a value in any unit and see all equivalents instantly. Supports millimeters, centimeters, meters, kilometers, inches, feet, yards, and miles. All calculations happen in your browser.",
    category: "unit",
    keywords: ["length converter", "distance converter", "meters to feet", "km to miles", "cm to inches", "metric to imperial", "length calculator"],
    icon: "📐",
    isClientSide: true,
    relatedSlugs: ["unit-converter", "weight-converter", "temperature-converter", "data-size-converter"],
    supportedFormats: ["Numbers"],
    limitations: ["Does not support nautical miles or light-year units", "Precision may vary for very large or very small values"],
    faq: [
      { question: "What units are supported?", answer: "Millimeters (mm), centimeters (cm), meters (m), kilometers (km), inches (in), feet (ft), yards (yd), and miles (mi)." },
      { question: "Are the conversions exact?", answer: "Yes. All conversions use exact conversion factors (e.g., 1 inch = 25.4mm, 1 mile = 1609.344m). Results are displayed with up to 6 decimal places." },
    ],
  },
  {
    slug: "weight-converter",
    name: "Weight & Mass Converter",
    description: "Convert between milligrams, grams, kilograms, tons, ounces, pounds, and stones. Real-time multi-unit display.",
    longDescription: "Convert weight and mass measurements across metric and imperial units. Enter a value in any unit and see all equivalents instantly. Supports milligrams, grams, kilograms, metric tons, ounces, pounds, and stones. All calculations happen in your browser.",
    category: "unit",
    keywords: ["weight converter", "mass converter", "kg to lbs", "grams to ounces", "pounds to kg", "metric to imperial weight", "weight calculator"],
    icon: "⚖️",
    isClientSide: true,
    relatedSlugs: ["unit-converter", "length-converter", "temperature-converter", "data-size-converter"],
    supportedFormats: ["Numbers"],
    limitations: ["Uses metric tons (tonnes) — US short tons are not supported", "Very small values may display in exponential notation"],
    faq: [
      { question: "What units are supported?", answer: "Milligrams (mg), grams (g), kilograms (kg), metric tons (t), ounces (oz), pounds (lb), and stones (st)." },
      { question: "Is the ton metric or imperial?", answer: "The tool uses metric tons (tonnes), where 1 ton = 1000 kg. US short tons (907.185 kg) and UK long tons are not supported." },
    ],
  },
  {
    slug: "hex-base64-converter",
    name: "HEX to Base64 Converter",
    description: "Convert hexadecimal strings to Base64 and vice versa. Includes validation for non-hex characters.",
    longDescription: "Convert between hexadecimal and Base64 formats. Enter a hex string to get its Base64 equivalent, or paste Base64 to decode to hex. The tool validates input and flags non-hexadecimal characters. All processing happens in your browser.",
    category: "developers",
    keywords: ["hex to base64", "base64 to hex", "hexadecimal converter", "base64 converter", "hex encoder", "hex decoder"],
    icon: "🔄",
    isClientSide: true,
    relatedSlugs: ["base64-encoder", "base64-decoder", "hex-rgb-converter"],
    supportedFormats: ["Hexadecimal", "Base64"],
    limitations: ["Hex input must have even number of characters", "Hex input with odd length or non-hex characters will produce an error"],
    faq: [
      { question: "What formats are accepted for hex input?", answer: "The tool accepts hex strings with or without 0x prefix, and with or without spaces. Only characters 0-9 and a-f/A-F are valid." },
      { question: "How does Base64 to hex work?", answer: "The Base64 string is decoded to raw bytes using atob, then each byte is converted to its 2-digit hexadecimal representation." },
    ],
  },
  {
    slug: "unicode-inspector",
    name: "Unicode Character Inspector",
    description: "Inspect any character's Unicode code point, HTML entities, UTF-8 and UTF-16 encoding. Detailed character properties.",
    longDescription: "Enter any text and inspect each character's Unicode properties: code point (U+XXXX), decimal value, HTML entity (decimal and hex), UTF-8 byte sequence, and UTF-16 encoding. Handles multi-byte characters and surrogate pairs correctly. All processing happens in your browser.",
    category: "developers",
    keywords: ["unicode inspector", "unicode code point", "character inspector", "utf-8 encoding", "utf-16 encoding", "html entity", "character properties"],
    icon: "🔍",
    isClientSide: true,
    relatedSlugs: ["binary-text-converter", "hex-base64-converter", "ascii-art-generator"],
    supportedFormats: ["Text"],
    limitations: ["Does not show Unicode category (e.g., Letter, Number) or block name", "Surrogate pairs are shown as individual UTF-16 units"],
    faq: [
      { question: "What is a code point?", answer: "A code point is a unique number assigned to each Unicode character, written as U+XXXX (e.g., U+0041 for 'A'). Characters outside the BMP use 5-6 hex digits." },
      { question: "How are emoji handled?", answer: "Emoji are typically multi-byte characters. The tool uses codePointAt(0) which correctly handles surrogate pairs, and shows the full code point (e.g., U+1F600 for 😀)." },
    ],
  },
  {
    slug: "random-string-generator",
    name: "Random String Generator",
    description: "Generate random strings with customizable length, character sets, and count. Block duplicate characters option.",
    longDescription: "Generate multiple random strings with full control: set length (1-64), count (1-50), choose character sets (uppercase, lowercase, numbers, special characters), and optionally block duplicate characters within each string. All generation happens client-side.",
    category: "generators",
    keywords: ["random string generator", "random text generator", "random characters", "string generator", "random token", "random key generator"],
    icon: "🔤",
    isClientSide: true,
    relatedSlugs: ["password-generator", "uuid-generator", "random-number-generator", "random-choice-picker"],
    supportedFormats: ["Text"],
    limitations: ["Uses Math.random() — not cryptographically secure. For passwords, use the Password Generator", "Blocking duplicates limits maximum string length to the charset size"],
    faq: [
      { question: "Is this suitable for passwords?", answer: "The tool uses Math.random() which is not cryptographically secure. For secure passwords, use the Password Generator which uses the Web Crypto API." },
      { question: "What does 'Block duplicates' do?", answer: "When enabled, no character will appear more than once in each generated string. This limits the maximum string length to the number of available characters in the selected charset." },
    ],
  },
  {
    slug: "ascii-art-generator",
    name: "ASCII Art Text Generator",
    description: "Convert text into stylized ASCII art banners. Block font with copy-to-clipboard. All client-side.",
    longDescription: "Transform plain text into multi-line ASCII art banners. Type any text and see it rendered in a block font made of Unicode block characters. Copy the result with one click. All generation happens in your browser.",
    category: "text",
    keywords: ["ascii art", "ascii text", "text to ascii", "ascii banner", "block text", "figlet", "text art generator"],
    icon: "🎨",
    isClientSide: true,
    relatedSlugs: ["unicode-inspector", "binary-text-converter", "morse-code-translator"],
    supportedFormats: ["Text"],
    limitations: ["Only supports A-Z, 0-9, and space — lowercase is converted to uppercase", "Maximum input length is 20 characters"],
    faq: [
      { question: "What characters are supported?", answer: "The block font supports A-Z (uppercase), 0-9, and space. Lowercase input is automatically converted to uppercase. Other characters are skipped." },
      { question: "Can I use different fonts?", answer: "The current version includes one block font. Additional fonts may be added in future updates." },
    ],
  },
  {
    slug: "text-anonymizer",
    name: "Text Anonymizer & PII Masker",
    description: "Mask emails, phone numbers, and IP addresses in text. Privacy protection with toggleable redaction rules.",
    longDescription: "Protect sensitive information in logs and text. The tool scans for emails, phone numbers, and IP addresses using regex and replaces them with redaction markers. Toggle each entity type independently. All processing happens in your browser.",
    category: "text",
    keywords: ["text anonymizer", "pii masker", "data redaction", "privacy protection", "email redaction", "phone redaction", "ip redaction"],
    icon: "🔒",
    isClientSide: true,
    relatedSlugs: ["text-replacer", "regex-tester", "password-strength-meter"],
    supportedFormats: ["Text"],
    limitations: ["Phone number detection uses pattern matching — some formats may be missed", "Email regex covers standard formats but not all edge cases"],
    faq: [
      { question: "What PII does the tool detect?", answer: "Emails (standard format), phone numbers (international and US formats), and IPv4 addresses. Each type can be toggled on or off." },
      { question: "Is the redaction accurate?", answer: "The tool uses regex patterns for detection. While it covers common formats, no regex is perfect. Verify results for critical compliance use cases." },
    ],
  },
  {
    slug: "markdown-table-generator",
    name: "Markdown Table Generator",
    description: "Create Markdown tables visually with an interactive grid editor. Adjustable rows, columns, and per-column alignment.",
    longDescription: "Build Markdown tables with an Excel-style grid editor. Set the number of rows and columns, type content into cells, choose left/center/right alignment per column, and copy the generated Markdown table string. All processing happens in your browser.",
    category: "text",
    keywords: ["markdown table", "md table generator", "markdown table maker", "table to markdown", "markdown grid", "markdown formatter"],
    icon: "📋",
    isClientSide: true,
    relatedSlugs: ["markdown-to-html", "text-replacer", "ascii-art-generator"],
    supportedFormats: ["Markdown"],
    limitations: ["Maximum 20 rows and 10 columns", "Does not support cell merging or complex formatting"],
    faq: [
      { question: "How do I set column alignment?", answer: "Each column header has a dropdown selector below it. Choose Left, Center, or Right to set the alignment for that column." },
      { question: "Can I add more rows or columns?", answer: "Yes. Use the Rows and Columns number inputs at the top to resize the table. Existing data is preserved when resizing." },
    ],
  },
  {
    slug: "json-path-finder",
    name: "JSON Path Finder",
    description: "Paste JSON and explore a searchable tree. Click any node to get its dot-notation path for easy access.",
    longDescription: "Navigate complex nested JSON structures with an interactive tree view. Click any leaf node to see and copy its dot-notation path (e.g., response.data.users[0].profile.id). Handles arrays, nested objects, and all JSON data types. All processing happens in your browser.",
    category: "developers",
    keywords: ["json path finder", "json tree", "json navigator", "dot notation", "json explorer", "json path", "json viewer"],
    icon: "🧭",
    isClientSide: true,
    relatedSlugs: ["json-formatter", "json-validator", "json-xml-converter"],
    supportedFormats: ["JSON"],
    limitations: ["Does not support JSONPath or jq-style queries", "Very large JSON files may render slowly"],
    faq: [
      { question: "What format are paths in?", answer: "Paths use dot notation for object keys (e.g., .name) and bracket notation for array indices (e.g., [0]). Example: $.users[0].profile.name" },
      { question: "Can I copy the path?", answer: "Yes. Click any leaf node and the path appears in a highlighted box with a copy button." },
    ],
  },
  {
    slug: "css-glassmorphism-studio",
    name: "CSS Glassmorphism Studio",
    description: "Create glassmorphism effects with backdrop-filter. Adjust blur, opacity, radius, tint, and shadow with live preview.",
    longDescription: "Design modern glassmorphism (frosted glass) UI effects with an interactive editor. Control backdrop blur, background opacity, border radius, tint color, and shadow spread. See a live preview over a gradient background and copy the generated CSS. All processing happens in your browser.",
    category: "design",
    keywords: ["glassmorphism", "glass effect css", "backdrop filter", "frosted glass", "glass ui", "css glass", "blur background"],
    icon: "🪟",
    isClientSide: true,
    relatedSlugs: ["css-gradient-generator", "css-box-shadow-generator", "css-clip-path-maker"],
    supportedFormats: ["CSS"],
    limitations: ["backdrop-filter requires modern browser support (Chrome 76+, Safari 9+, Firefox 103+)", "Effect may not render on elements without content behind them"],
    faq: [
      { question: "What is glassmorphism?", answer: "Glassmorphism is a UI design trend that uses backdrop-filter blur with semi-transparent backgrounds to create a frosted glass effect over content behind the element." },
      { question: "Does backdrop-filter work in all browsers?", answer: "Most modern browsers support it. Safari requires the -webkit- prefix (included automatically). Very old browsers will show the semi-transparent background without blur." },
    ],
  },
  {
    slug: "css-clip-path-maker",
    name: "CSS Clip-Path Maker",
    description: "Create CSS clip-path polygons visually. Drag nodes, add points, and copy clip-path code with live preview.",
    longDescription: "Design CSS clip-path polygons with an interactive visual editor. Drag nodes to adjust the polygon shape, add or remove points (up to 12), and see the clipped result in real time. Copy the generated clip-path CSS code. All processing happens in your browser.",
    category: "design",
    keywords: ["css clip-path", "clip-path maker", "css polygon", "clip path generator", "css mask", "clip-path polygon"],
    icon: "✂️",
    isClientSide: true,
    relatedSlugs: ["css-glassmorphism-studio", "css-gradient-generator", "css-box-shadow-generator"],
    supportedFormats: ["CSS"],
    limitations: ["Only supports polygon clip-path (not circle, ellipse, or inset)", "Maximum 12 polygon points", "Drag-and-drop may not work on touch devices"],
    faq: [
      { question: "What is clip-path?", answer: "The clip-path CSS property creates a clipping region that determines which parts of an element are visible. The polygon function defines a custom shape using percentage coordinates." },
      { question: "Can I use circle or ellipse clip-paths?", answer: "The current version only supports polygon clip-paths. Circle and ellipse shapes may be added in future updates." },
    ],
  },
  {
    slug: "colorblind-simulator",
    name: "Colorblind Vision Simulator",
    description: "Simulate how colors appear to people with Protanopia, Deuteranopia, and Tritanopia. Includes WCAG contrast scores.",
    longDescription: "Test color combinations for accessibility. Pick foreground and background colors, then see how they appear under three types of color blindness: Protanopia (red-blind), Deuteranopia (green-blind), and Tritanopia (blue-blind). Each simulation includes a WCAG 2.1 contrast ratio score. All processing happens in your browser.",
    category: "design",
    keywords: ["colorblind simulator", "color blindness", "protanopia", "deuteranopia", "tritanopia", "accessibility tester", "wcag contrast", "color vision deficiency"],
    icon: "👁️",
    isClientSide: true,
    relatedSlugs: ["contrast-checker", "hex-rgb-converter", "css-gradient-generator"],
    supportedFormats: ["HEX colors"],
    limitations: ["Simulation is an approximation — actual perception varies per individual", "Does not cover anomalous trichromacy (partial color blindness)"],
    faq: [
      { question: "What are the three color blindness types?", answer: "Protanopia (red-blind), Deuteranopia (green-blind), and Tritanopia (blue-blind). These are the most common types of dichromatic color vision deficiency." },
      { question: "Is the simulation accurate?", answer: "The simulation uses established transformation matrices for dichromatic vision. It provides a good approximation but cannot perfectly replicate individual perception differences." },
    ],
  },
  {
    slug: "social-meta-previewer",
    name: "Social Media Meta Tags Previewer",
    description: "Preview how your website looks on Google, Facebook, Twitter/X, and Discord. Real-time social card mockups.",
    longDescription: "Enter your page title, description, site name, URL, and image URL to see real-time visual previews of how your link will appear when shared on Google SERP, Facebook Feed, Twitter/X Cards, and Discord embeds. All processing happens in your browser.",
    category: "developers",
    keywords: ["social meta tags", "og tags preview", "twitter card preview", "open graph preview", "social sharing preview", "serp preview", "link preview"],
    icon: "📱",
    isClientSide: true,
    relatedSlugs: ["seo", "url-parser", "json-xml-converter"],
    supportedFormats: ["Text input"],
    limitations: ["Previews are approximations — actual rendering may vary by platform", "Image is not loaded — only the URL is shown in the preview"],
    faq: [
      { question: "What meta tags do these previews correspond to?", answer: "Google uses the title tag and meta description. Facebook uses og:title, og:description, og:image, and og:site_name. Twitter uses twitter:card, twitter:title, and twitter:description. Discord uses og: tags similarly." },
      { question: "Why doesn't the image show?", answer: "The tool shows a placeholder for the image area. In production, the actual image would be loaded from the URL you specify in your og:image meta tag." },
    ],
  },
  {
    slug: "nginx-formatter",
    name: "Nginx Config Beautifier",
    description: "Format and beautify Nginx configuration files. Proper indentation for server, location, and proxy directives.",
    longDescription: "Clean up messy Nginx config files with proper indentation. The formatter parses directives and aligns brackets for server, location, proxy_pass, and other blocks. Comments are preserved. All processing happens in your browser.",
    category: "developers",
    keywords: ["nginx formatter", "nginx beautifier", "nginx config", "nginx indentation", "config formatter", "server config"],
    icon: "⚙️",
    isClientSide: true,
    relatedSlugs: ["sql-formatter", "json-formatter", "xml-formatter"],
    supportedFormats: ["Nginx config"],
    limitations: ["Uses simple bracket-based indentation — does not validate syntax", "Does not support inline comments within directives"],
    faq: [
      { question: "Does the formatter validate my Nginx config?", answer: "No. The tool only formats indentation based on opening and closing braces. It does not validate Nginx syntax. Use nginx -t to validate your config." },
      { question: "Are comments preserved?", answer: "Yes. Lines starting with # are treated as comments and preserved in the output without indentation changes." },
    ],
  },
  {
    slug: "csv-to-sql-converter",
    name: "CSV to SQL INSERT Generator",
    description: "Convert CSV data into SQL INSERT statements. Custom table name, separator selection, and auto number detection.",
    longDescription: "Transform CSV data into ready-to-use SQL INSERT statements. Enter a table name, choose your separator (comma, semicolon, tab), paste your CSV, and get formatted INSERT INTO statements. Numeric values are auto-detected and left unquoted. All processing happens in your browser.",
    category: "developers",
    keywords: ["csv to sql", "csv to insert", "sql insert generator", "csv to sql converter", "csv import sql", "insert statement generator"],
    icon: "🗃️",
    isClientSide: true,
    relatedSlugs: ["csv-json-converter", "sql-formatter", "json-formatter"],
    supportedFormats: ["CSV"],
    limitations: ["Auto-detects numbers by attempting Number() conversion — locale-specific number formats may not work", "Does not handle CSV values containing newlines within quoted fields"],
    faq: [
      { question: "How are numbers detected?", answer: "The tool uses JavaScript's Number() function. If a value converts to a valid number, it is inserted without quotes. All other values are quoted as strings with single-quote escaping." },
      { question: "Can I use a custom table name?", answer: "Yes. Enter the table name in the input field. The first row of your CSV is used as column names." },
    ],
  },
  {
    slug: "homoglyph-detector",
    name: "Unicode Homoglyph Detector",
    description: "Detect lookalike Unicode characters in text. Phishing defense tool for identifying Cyrillic, Greek, and IPA homoglyphs.",
    longDescription: "Protect against phishing and punycode attacks. Paste a URL or text and the tool highlights hidden homoglyphs — Unicode characters from different scripts that look identical to Latin letters (e.g., Cyrillic 'а' replacing Latin 'a'). Each detection shows the character, its position, and what it resembles. All processing happens in your browser.",
    category: "security",
    keywords: ["homoglyph detector", "unicode lookalike", "phishing detection", "punycode attack", "cyrillic homoglyph", "unicode security", "domain spoofing"],
    icon: "🔍",
    isClientSide: true,
    relatedSlugs: ["unicode-inspector", "password-strength-meter", "jwt-decoder"],
    supportedFormats: ["Text", "URLs"],
    limitations: ["Covers common Cyrillic, Greek, and IPA homoglyphs — not exhaustive", "Does not check domain registration or SSL certificates"],
    faq: [
      { question: "What is a homoglyph?", answer: "A homoglyph is a character from one script that looks identical to a character from another script. For example, the Cyrillic 'а' (U+0430) looks identical to the Latin 'a' (U+0061) but is a different character." },
      { question: "How do homoglyph attacks work?", answer: "Attackers register domains using homoglyphs (e.g., 'аpple.com' with Cyrillic 'а'). The domain looks legitimate but resolves to a different server. This tool helps spot such characters." },
    ],
  },
  {
    slug: "jwt-spoofing-simulator",
    name: "JWT Payload Spoofing Simulator",
    description: "Educational tool: decode a JWT, edit its payload, and re-encode it. Includes security warning about signature verification.",
    longDescription: "An educational security tool for understanding JWT vulnerabilities. Paste a JWT token, decode its header and payload, edit the payload JSON (e.g., change role from 'user' to 'admin'), and see the re-encoded token. A prominent warning explains that the modified token will fail signature verification unless the server has a broken secret key validation. All processing happens in your browser.",
    category: "security",
    keywords: ["jwt spoofing", "jwt simulator", "jwt security", "jwt payload edit", "jwt vulnerability", "token tampering", "jwt educational"],
    icon: "🎓",
    isClientSide: true,
    relatedSlugs: ["jwt-decoder", "base64-encoder", "base64-decoder"],
    supportedFormats: ["JWT"],
    limitations: ["Only modifies the payload — the signature remains unchanged and will not match", "Educational use only — do not use to attack real systems"],
    faq: [
      { question: "Will the modified token work?", answer: "No. The JWT signature is computed using the header and payload together with a secret key. Changing the payload invalidates the signature. Any properly implemented server will reject the modified token." },
      { question: "Why is this tool useful?", answer: "It demonstrates why JWT signature verification is critical. If a server fails to verify signatures (a common misconfiguration), an attacker could escalate privileges by editing the payload." },
    ],
  },
  {
    slug: "svg-path-editor",
    name: "SVG Path Visualizer & Editor",
    description: "Paste SVG path data, render it on canvas, and inspect node coordinates. Copy path data instantly.",
    longDescription: "Visualize and edit SVG path data interactively. Paste the d attribute of an SVG path, see it rendered on a canvas, inspect node coordinates, and copy the path string. Supports M, L, and Z commands. All processing happens in your browser.",
    category: "image",
    keywords: ["svg path", "path editor", "svg visualizer", "path data", "svg editor", "path d attribute", "svg nodes"],
    icon: "📐",
    isClientSide: true,
    relatedSlugs: ["svg-to-png-converter", "css-clip-path-maker", "color-palette-generator"],
    supportedFormats: ["SVG path data"],
    limitations: ["Supports M, L, and Z path commands only", "Does not support curves (C, Q, A) or interactive node dragging yet"],
    faq: [
      { question: "What path commands are supported?", answer: "Currently supports Move (M), Line (L), and Close Path (Z) commands. Curve commands (C, Q, A) are rendered but their nodes are not parsed for editing." },
      { question: "Can I drag nodes to edit the path?", answer: "The current version displays node coordinates but does not support drag editing. This feature may be added in future updates." },
    ],
  },
  {
    slug: "canvas-code-painter",
    name: "HTML Canvas Code Painter",
    description: "Draw shapes on canvas and generate JavaScript Canvas 2D Context API code automatically.",
    longDescription: "An interactive canvas drawing tool that generates clean JavaScript code. Draw rectangles, circles, lines, and text by clicking on the canvas. The tool outputs ready-to-paste ctx.beginPath(), ctx.arc(), ctx.fillRect() code sequences. All processing happens in your browser.",
    category: "developers",
    keywords: ["canvas code", "canvas painter", "html5 canvas", "ctx code generator", "canvas api", "javascript canvas", "drawing code"],
    icon: "🖌️",
    isClientSide: true,
    relatedSlugs: ["svg-path-editor", "css-box-shadow-generator", "css-gradient-generator"],
    supportedFormats: ["JavaScript"],
    limitations: ["Rectangles are drawn by click-drag — click start, release at end", "Does not support gradients, shadows, or complex paths in generated code"],
    faq: [
      { question: "How do I draw shapes?", answer: "Select a shape type (rectangle, circle, line, text), then click on the canvas. For rectangles and lines, click and drag from start to end point. For circles and text, a single click places the shape." },
      { question: "What code is generated?", answer: "The tool generates vanilla JavaScript using the Canvas 2D Context API (ctx.fillRect, ctx.arc, ctx.moveTo, ctx.lineTo, ctx.fillText). You can copy and paste it into any HTML file." },
    ],
  },
  {
    slug: "css-animation-studio",
    name: "CSS Animation Keyframes Studio",
    description: "Create CSS @keyframes animations visually. Add color stops, set duration, preview live, and export code.",
    longDescription: "Design CSS animations with a visual timeline editor. Add keyframe stops at different percentages, choose colors or transform scale, set animation duration, preview the animation live, and export clean @keyframes CSS code. All processing happens in your browser.",
    category: "design",
    keywords: ["css animation", "keyframes generator", "css animation studio", "keyframes editor", "css animation maker", "animation timeline"],
    icon: "🎬",
    isClientSide: true,
    relatedSlugs: ["css-glassmorphism-studio", "css-gradient-generator", "css-box-shadow-generator"],
    supportedFormats: ["CSS"],
    limitations: ["Supports background-color and transform scale properties only", "Maximum keyframe count is limited by UI"],
    faq: [
      { question: "What properties can I animate?", answer: "Currently supports background-color transitions and transform scale. Additional properties may be added in future updates." },
      { question: "How do I add keyframe stops?", answer: "Click 'Add Keyframe' to create a new stop. Set the percentage (0-100) and color for each stop. The animation will interpolate between stops." },
    ],
  },
  {
    slug: "cookie-explorer",
    name: "Browser Cookie Explorer Sandbox",
    description: "Read, create, and delete LocalStorage, SessionStorage, and cookies. Includes capacity visualization.",
    longDescription: "A sandbox for exploring browser storage. View, add, and delete key-value pairs in LocalStorage, SessionStorage, and cookies. See storage capacity bars and test storage behavior. All operations happen in your browser only.",
    category: "developers",
    keywords: ["cookie explorer", "localstorage", "sessionstorage", "browser storage", "cookie viewer", "storage sandbox", "web storage"],
    icon: "🍪",
    isClientSide: true,
    relatedSlugs: ["jwt-decoder", "user-agent-parser", "base64-encoder"],
    supportedFormats: ["Browser storage"],
    limitations: ["Only accesses storage for the current domain/origin", "Cookie deletion depends on path and domain settings"],
    faq: [
      { question: "Is it safe to use?", answer: "Yes. The tool only reads and writes storage for the current website domain. It does not access cookies from other websites or send data anywhere." },
      { question: "Why can't I delete some cookies?", answer: "Cookies with specific path or domain restrictions may require matching attributes to delete. The tool uses path=/ for deletion, which works for most cookies." },
    ],
  },
  {
    slug: "exif-location-plotter",
    name: "EXIF Image Location Map Plotter",
    description: "Extract GPS coordinates from JPEG EXIF data and plot the photo location on an OpenStreetMap.",
    longDescription: "Upload a JPEG photo and the tool reads EXIF metadata locally, including GPS coordinates. If location data is found, it displays the capture point on an embedded OpenStreetMap. Also shows camera make, model, date, and other EXIF tags. All processing happens in your browser.",
    category: "image",
    keywords: ["exif reader", "gps coordinates", "photo location", "exif metadata", "image exif", "jpeg exif", "photo map"],
    icon: "📍",
    isClientSide: true,
    relatedSlugs: ["image-compressor", "image-resizer", "jpg-to-png"],
    supportedFormats: ["JPEG"],
    limitations: ["Only supports JPEG files with EXIF data", "Photos without GPS EXIF data will show metadata only", "HEIC and RAW formats are not supported"],
    faq: [
      { question: "Does the tool upload my photos?", answer: "No. All EXIF parsing happens in your browser. The image file is never uploaded to any server." },
      { question: "Why does my photo not show GPS data?", answer: "GPS data is only present if the camera or phone had location services enabled when the photo was taken. Some apps also strip EXIF data for privacy." },
    ],
  },
  {
    slug: "audio-tag-reader",
    name: "Audio ID3 Tag Reader",
    description: "Extract metadata from MP3 and M4A files. Read title, artist, album, year, genre, and track number.",
    longDescription: "Drag and drop an MP3 or M4A file to extract embedded metadata tags. The tool parses ID3v2 tags for MP3 and M4A atoms locally, displaying song title, artist, album, year, genre, and track number. All processing happens in your browser.",
    category: "developers",
    keywords: ["id3 tag reader", "mp3 metadata", "audio tags", "m4a metadata", "mp3 tag extractor", "audio info", "music metadata"],
    icon: "🎵",
    isClientSide: true,
    relatedSlugs: ["exif-location-plotter", "image-compressor", "jwt-decoder"],
    supportedFormats: ["MP3", "M4A"],
    limitations: ["Only supports MP3 (ID3v2) and M4A formats", "Does not extract album cover art in this version", "Very large files may take a moment to parse"],
    faq: [
      { question: "What audio formats are supported?", answer: "MP3 files with ID3v2 tags and M4A files with iTunes-style metadata atoms. Other formats like WAV, OGG, and FLAC are not supported." },
      { question: "Can I extract album art?", answer: "The current version extracts text metadata only. Album art extraction may be added in a future update." },
    ],
  },
  {
    slug: "unix-timestamp-converter",
    name: "Unix Timestamp Converter",
    description: "Convert Unix epoch timestamps to human-readable dates and vice versa. Live clock with UTC, local, and ISO 8601 output.",
    longDescription: "A dual-directional Unix timestamp converter. Enter a numeric epoch timestamp to see UTC, local, and ISO 8601 representations. Or pick a date-time to get the corresponding Unix timestamp. Includes a live ticking clock. All processing happens in your browser.",
    category: "calculators",
    keywords: ["unix timestamp", "epoch converter", "unix to date", "date to unix", "timestamp converter", "epoch time", "unix time"],
    icon: "⏰",
    isClientSide: true,
    relatedSlugs: ["date-calculator", "age-calculator", "cron-expression-generator"],
    supportedFormats: ["Unix epoch", "Date-time"],
    limitations: ["Timestamps before 1970-01-01 (negative epochs) may not display correctly in all browsers", "Maximum date is limited by JavaScript Date object (year 275760)"],
    faq: [
      { question: "What is a Unix timestamp?", answer: "A Unix timestamp is the number of seconds that have elapsed since January 1, 1970 UTC (the Unix epoch). It's a standard way to represent time in computing." },
      { question: "Does the tool support milliseconds?", answer: "The tool works with second-based timestamps. For millisecond timestamps, divide by 1000 first." },
    ],
  },
  {
    slug: "base64-image-coder",
    name: "Base64 Image Encoder & Decoder",
    description: "Encode images to Base64 data URIs or decode Base64 strings back to downloadable images. All client-side.",
    longDescription: "Dual-mode image Base64 tool. Upload an image to get its Base64 data URI string, or paste a Base64 string to preview and download the decoded image. Supports all common image formats. All processing happens in your browser.",
    category: "image",
    keywords: ["base64 image", "image to base64", "base64 to image", "data uri", "image encoder", "image decoder", "base64 encode image"],
    icon: "🖼️",
    isClientSide: true,
    relatedSlugs: ["base64-encoder", "base64-decoder", "image-compressor"],
    supportedFormats: ["PNG", "JPEG", "GIF", "WebP", "SVG", "Base64"],
    limitations: ["Large images produce very long Base64 strings", "Decoding requires a valid Base64 data URI or raw Base64 string"],
    faq: [
      { question: "What is a Base64 data URI?", answer: "A data URI is a string that embeds the entire image data inline, formatted as data:image/png;base64,.... It can be used directly in HTML src attributes or CSS." },
      { question: "Is there a file size limit?", answer: "The tool handles files up to your browser's memory limit. Very large images may cause performance issues." },
    ],
  },
  {
    slug: "hash-generator-engine",
    name: "Hash Generator Engine (MD5/SHA-1/SHA-256/SHA-512)",
    description: "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes simultaneously from text input. Uppercase toggle and one-click copy.",
    longDescription: "A unified cryptographic hash generator. Type or paste text and instantly get MD5, SHA-1, SHA-256, and SHA-512 hash values. Toggle uppercase output and copy any hash with one click. SHA hashes use the Web Crypto API. All processing happens in your browser.",
    category: "developers",
    keywords: ["hash generator", "md5 hash", "sha1 hash", "sha256 hash", "sha512 hash", "checksum", "cryptographic hash"],
    icon: "🔐",
    isClientSide: true,
    relatedSlugs: ["md5-hash-generator", "sha256-hash-generator", "base64-encoder"],
    supportedFormats: ["Plain text"],
    limitations: ["MD5 is implemented in JavaScript (not Web Crypto) for compatibility", "MD5 and SHA-1 are cryptographically broken — use SHA-256 or SHA-512 for security purposes"],
    faq: [
      { question: "Why are all four hashes shown at once?", answer: "Convenience. You can compare hashes or use the one you need without switching tools. Each hash can be copied independently." },
      { question: "Is MD5 secure?", answer: "No. MD5 is cryptographically broken and should not be used for security purposes. Use SHA-256 or SHA-512 for passwords, signatures, and integrity verification." },
    ],
  },
  {
    slug: "robots-txt-tester",
    name: "Robots.txt & Sitemap Tester",
    description: "Paste a robots.txt file and URLs to check which are blocked by Disallow rules. Includes sitemap detection.",
    longDescription: "Analyze robots.txt files for URL blocking rules. Paste your robots.txt content and a list of URLs to test. The tool checks each URL against User-agent, Disallow, and Allow rules and produces a compliance report. Also detects Sitemap directives. All processing happens in your browser.",
    category: "developers",
    keywords: ["robots.txt", "robots tester", "sitemap tester", "url blocking", "disallow checker", "robots parser", "seo testing"],
    icon: "🤖",
    isClientSide: true,
    relatedSlugs: ["url-parser", "social-meta-previewer", "url-slug-generator"],
    supportedFormats: ["robots.txt", "URL paths"],
    limitations: ["Uses simplified pattern matching — does not support all robots.txt edge cases", "Does not fetch remote robots.txt files — paste the content manually"],
    faq: [
      { question: "How does the Allow/Disallow precedence work?", answer: "The tool follows the standard where more specific Allow rules can override broader Disallow rules. If an Allow path is longer than or equal to the Disallow path, the URL is allowed." },
      { question: "Can I test remote robots.txt files?", answer: "No. For privacy and CORS reasons, the tool only processes pasted content. Copy your robots.txt content and paste it into the input field." },
    ],
  },
  {
    slug: "cron-explainer",
    name: "Cron Schedule Explainer",
    description: "Paste a cron expression and get a human-readable explanation plus the next 5 execution times.",
    longDescription: "Decode cron expressions into plain language descriptions. Enter a 5-part cron expression (e.g., */15 * * * *) and get a fluent explanation of when it runs, plus the next 5 estimated execution timestamps. All processing happens in your browser.",
    category: "developers",
    keywords: ["cron explainer", "cron expression", "cron parser", "cron schedule", "crontab", "cron human readable", "cron next run"],
    icon: "📅",
    isClientSide: true,
    relatedSlugs: ["cron-expression-generator", "unix-timestamp-converter", "date-calculator"],
    supportedFormats: ["Cron expressions"],
    limitations: ["Supports standard 5-part cron expressions (minute hour day month day-of-week)", "Does not support @reboot, @daily, or other named schedules", "Next execution times are approximate for complex expressions"],
    faq: [
      { question: "What format does the explainer support?", answer: "Standard 5-part cron: minute (0-59), hour (0-23), day of month (1-31), month (1-12), day of week (0-6 where 0=Sunday)." },
      { question: "How are next execution times calculated?", answer: "The tool iterates minute by minute from the current time, checking each field against the cron pattern. This is accurate but may be slow for very sparse schedules." },
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
