# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: python.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x0cpython.proto\x12\x06python\"%\n\x05Query\x12\r\n\x05index\x18\x01 \x01(\t\x12\r\n\x05query\x18\x02 \x01(\t\"\x1e\n\x0bQueryResult\x12\x0f\n\x07results\x18\x01 \x03(\t\"F\n\x15IndexDirectoryRequest\x12\x0c\n\x04path\x18\x01 \x01(\t\x12\x1f\n\x04type\x18\x02 \x01(\x0e\x32\x11.python.IndexType\"4\n\x05Index\x12\n\n\x02id\x18\x01 \x01(\t\x12\x1f\n\x04type\x18\x02 \x01(\x0e\x32\x11.python.IndexType\"\x14\n\x04Text\x12\x0c\n\x04text\x18\x01 \x01(\t\" \n\nCategories\x12\x12\n\ncategories\x18\x01 \x03(\t\"K\n\x11\x43\x61tegorizeRequest\x12\x0c\n\x04text\x18\x01 \x01(\t\x12(\n\x0b\x63\x61tegorizer\x18\x02 \x01(\x0e\x32\x13.python.Categorizer\"K\n\x10SummarizeRequest\x12\x0f\n\x07\x63ontent\x18\x01 \x01(\t\x12&\n\nsummarizer\x18\x02 \x01(\x0e\x32\x12.python.Summarizer\"$\n\x11SummarizeResponse\x12\x0f\n\x07summary\x18\x01 \x01(\t\"!\n\x11TranscribeRequest\x12\x0c\n\x04\x66ile\x18\x01 \x01(\t\"+\n\x12TranscribeResponse\x12\x15\n\rtranscription\x18\x01 \x01(\t\"\x13\n\x05Video\x12\n\n\x02id\x18\x01 \x01(\t\"B\n\x11TranscriptSection\x12\x0c\n\x04text\x18\x01 \x01(\t\x12\r\n\x05start\x18\x02 \x01(\x02\x12\x10\n\x08\x64uration\x18\x03 \x01(\x02\";\n\nTranscript\x12-\n\ntranscript\x18\x01 \x03(\x0b\x32\x19.python.TranscriptSection*+\n\tIndexType\x12\t\n\x05LLAMA\x10\x00\x12\t\n\x05\x46\x41ISS\x10\x01\x12\x08\n\x04\x42M25\x10\x02*&\n\x0b\x43\x61tegorizer\x12\n\n\x06T5_TAG\x10\x00\x12\x0b\n\x07KEYBERT\x10\x01*%\n\nSummarizer\x12\r\n\tLANGCHAIN\x10\x00\x12\x08\n\x04\x42\x45RT\x10\x01\x32\x9f\x03\n\x06Python\x12\x43\n\nTranscribe\x12\x19.python.TranscribeRequest\x1a\x1a.python.TranscribeResponse\x12@\n\tSummarize\x12\x18.python.SummarizeRequest\x1a\x19.python.SummarizeResponse\x12\x36\n\x11YoutubeTranscript\x12\r.python.Video\x1a\x12.python.Transcript\x12\'\n\tNormalize\x12\x0c.python.Text\x1a\x0c.python.Text\x12;\n\nCategorize\x12\x19.python.CategorizeRequest\x1a\x12.python.Categories\x12>\n\x0eIndexDirectory\x12\x1d.python.IndexDirectoryRequest\x1a\r.python.Index\x12\x30\n\nQueryIndex\x12\r.python.Query\x1a\x13.python.QueryResultB\x0eZ\x0c./gen/pythonb\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'python_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  DESCRIPTOR._serialized_options = b'Z\014./gen/python'
  _INDEXTYPE._serialized_start=699
  _INDEXTYPE._serialized_end=742
  _CATEGORIZER._serialized_start=744
  _CATEGORIZER._serialized_end=782
  _SUMMARIZER._serialized_start=784
  _SUMMARIZER._serialized_end=821
  _QUERY._serialized_start=24
  _QUERY._serialized_end=61
  _QUERYRESULT._serialized_start=63
  _QUERYRESULT._serialized_end=93
  _INDEXDIRECTORYREQUEST._serialized_start=95
  _INDEXDIRECTORYREQUEST._serialized_end=165
  _INDEX._serialized_start=167
  _INDEX._serialized_end=219
  _TEXT._serialized_start=221
  _TEXT._serialized_end=241
  _CATEGORIES._serialized_start=243
  _CATEGORIES._serialized_end=275
  _CATEGORIZEREQUEST._serialized_start=277
  _CATEGORIZEREQUEST._serialized_end=352
  _SUMMARIZEREQUEST._serialized_start=354
  _SUMMARIZEREQUEST._serialized_end=429
  _SUMMARIZERESPONSE._serialized_start=431
  _SUMMARIZERESPONSE._serialized_end=467
  _TRANSCRIBEREQUEST._serialized_start=469
  _TRANSCRIBEREQUEST._serialized_end=502
  _TRANSCRIBERESPONSE._serialized_start=504
  _TRANSCRIBERESPONSE._serialized_end=547
  _VIDEO._serialized_start=549
  _VIDEO._serialized_end=568
  _TRANSCRIPTSECTION._serialized_start=570
  _TRANSCRIPTSECTION._serialized_end=636
  _TRANSCRIPT._serialized_start=638
  _TRANSCRIPT._serialized_end=697
  _PYTHON._serialized_start=824
  _PYTHON._serialized_end=1239
# @@protoc_insertion_point(module_scope)
