import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn
import os

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    """Set inner cell padding in dxa (1 pt = 20 dxa)"""
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def set_cell_shading(cell, color_hex="F1F5F9"):
    """Set cell background color"""
    shading = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{color_hex}"/>')
    cell._tc.get_or_add_tcPr().append(shading)

def set_cell_borders(cell, top="000000", bottom="000000", left="000000", right="000000", sz="4"):
    tcPr = cell._tc.get_or_add_tcPr()
    tcBorders = parse_xml(f'''
        <w:tcBorders {nsdecls("w")}>
            <w:top w:val="single" w:sz="{sz}" w:space="0" w:color="{top}"/>
            <w:left w:val="single" w:sz="{sz}" w:space="0" w:color="{left}"/>
            <w:bottom w:val="single" w:sz="{sz}" w:space="0" w:color="{bottom}"/>
            <w:right w:val="single" w:sz="{sz}" w:space="0" w:color="{right}"/>
        </w:tcBorders>
    ''')
    tcPr.append(tcBorders)

def add_header_cell(row, col_idx, text, width_in=None, col_span=1, bg_hex="E2E8F0", font_size=9.5, align=WD_ALIGN_PARAGRAPH.LEFT):
    cell = row.cells[col_idx]
    if width_in:
        cell.width = Inches(width_in)
    set_cell_shading(cell, bg_hex)
    set_cell_margins(cell, top=80, bottom=80, left=120, right=120)
    set_cell_borders(cell)
    p = cell.paragraphs[0]
    p.alignment = align
    p.paragraph_format.space_before = Pt(1)
    p.paragraph_format.space_after = Pt(1)
    p.paragraph_format.line_spacing = 1.05
    run = p.add_run(text)
    run.bold = True
    run.font.name = "Calibri"
    run.font.size = Pt(font_size)
    run.font.color.rgb = RGBColor(0x0F, 0x17, 0x2A) # Slate 900
    return cell

def add_data_cell(row, col_idx, label, value="", width_in=None, bg_hex=None, bold_label=True, font_size=9):
    cell = row.cells[col_idx]
    if width_in:
        cell.width = Inches(width_in)
    if bg_hex:
        set_cell_shading(cell, bg_hex)
    set_cell_margins(cell, top=70, bottom=70, left=100, right=100)
    set_cell_borders(cell)
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(1)
    p.paragraph_format.space_after = Pt(1)
    p.paragraph_format.line_spacing = 1.05
    if label:
        r1 = p.add_run(label)
        r1.bold = bold_label
        r1.font.name = "Calibri"
        r1.font.size = Pt(font_size)
        r1.font.color.rgb = RGBColor(0x1E, 0x29, 0x3B)
    if value:
        if label and not label.endswith(" ") and not label.endswith(":"):
            p.add_run(" ")
        r2 = p.add_run(value)
        r2.bold = False
        r2.font.name = "Calibri"
        r2.font.size = Pt(font_size)
        r2.font.color.rgb = RGBColor(0x33, 0x41, 0x55)
    return cell

def build_hdfc_document(output_path):
    doc = docx.Document()

    # Page Setup: Standard A4 with crisp 0.65" margins so top is never cropped
    for s in doc.sections:
        s.top_margin = Inches(0.65)
        s.bottom_margin = Inches(0.65)
        s.left_margin = Inches(0.65)
        s.right_margin = Inches(0.65)
        s.page_width = Inches(8.27)
        s.page_height = Inches(11.69)

    # ----------------------------------------------------
    # PAGE 1: GENERAL DETAILS & LOCALITY
    # ----------------------------------------------------
    # Top Recipient Box
    t_top = doc.add_table(rows=1, cols=2)
    t_top.alignment = WD_TABLE_ALIGNMENT.CENTER
    t_top.autofit = False
    
    cell_to = t_top.rows[0].cells[0]
    cell_to.width = Inches(4.5)
    set_cell_margins(cell_to, top=80, bottom=80, left=100, right=100)
    set_cell_borders(cell_to)
    p_to = cell_to.paragraphs[0]
    p_to.paragraph_format.line_spacing = 1.05
    p_to.paragraph_format.space_after = Pt(2)
    r = p_to.add_run("To,\nThe Credit Manager (Mortgages)\nHDFC Bank Ltd., Patna Branch")
    r.font.name = "Calibri"
    r.font.size = Pt(9.5)
    r.bold = True

    cell_date = t_top.rows[0].cells[1]
    cell_date.width = Inches(2.47)
    set_cell_margins(cell_date, top=80, bottom=80, left=100, right=100)
    set_cell_borders(cell_date)
    p_date = cell_date.paragraphs[0]
    p_date.paragraph_format.line_spacing = 1.05
    p_date.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    r_date = p_date.add_run("DATE - 11-11-2024\nReport Ref: HDFC/VAL/2024/PAT-089")
    r_date.font.name = "Calibri"
    r_date.font.size = Pt(9.5)
    r_date.bold = True

    doc.add_paragraph().paragraph_format.space_after = Pt(2)

    # Table 1: GENERAL DETAILS
    t1 = doc.add_table(rows=1, cols=4)
    t1.alignment = WD_TABLE_ALIGNMENT.CENTER
    t1.autofit = False
    row = t1.rows[0]
    cell_hd = add_header_cell(row, 0, "GENERAL DETAILS", width_in=6.97, col_span=4, bg_hex="CBD5E1", font_size=10)
    # Merge row 0
    row.cells[0].merge(row.cells[1]).merge(row.cells[2]).merge(row.cells[3])

    # Type of Property Row
    r_type = t1.add_row()
    c_prop_lbl = add_data_cell(r_type, 0, "Type of property", "", width_in=1.8, bg_hex="F1F5F9", bold_label=True)
    c_prop_val = add_data_cell(r_type, 1, "", "[X] Residential    [ ] Commercial    [ ] Residential cum commercial    [ ] Industrial    [ ] Vacant Plot", width_in=5.17)
    c_prop_val.merge(r_type.cells[2]).merge(r_type.cells[3])

    # Customer Name & Loan App No
    r_cust = t1.add_row()
    add_data_cell(r_cust, 0, "Customer Name:", width_in=1.8, bg_hex="F8FAFC")
    add_data_cell(r_cust, 1, "M/s TrueArk Infra Project / Mr. Rajesh Kumar", width_in=2.2)
    add_data_cell(r_cust, 2, "Loan App No:", width_in=1.4, bg_hex="F8FAFC")
    add_data_cell(r_cust, 3, "HDFC-HL-2026-9082", width_in=1.57)

    # Property Address
    r_addr = t1.add_row()
    add_data_cell(r_addr, 0, "Property Address:", width_in=1.8, bg_hex="F8FAFC")
    c_addr = add_data_cell(r_addr, 1, "Flat No. 302, 3rd Floor, Shanti Vihar Apartment, Boring Canal Road, Patna, Bihar - 800001", width_in=5.17)
    c_addr.merge(r_addr.cells[2]).merge(r_addr.cells[3])

    # Landmark & Document Holder
    r_lm = t1.add_row()
    add_data_cell(r_lm, 0, "Landmark:", width_in=1.8, bg_hex="F8FAFC")
    add_data_cell(r_lm, 1, "Near Panchmukhi Hanuman Mandir", width_in=2.2)
    add_data_cell(r_lm, 2, "Document Holder:", width_in=1.4, bg_hex="F8FAFC")
    add_data_cell(r_lm, 3, "Self / Borrower", width_in=1.57)

    # Legal Address
    r_leg = t1.add_row()
    add_data_cell(r_leg, 0, "Legal Address:", width_in=1.8, bg_hex="F8FAFC")
    c_leg = add_data_cell(r_leg, 1, "Holding No. 42/B, Ward No. 18, Circle No. 2, Boring Canal Road, Patna Municipal Corporation", width_in=5.17)
    c_leg.merge(r_leg.cells[2]).merge(r_leg.cells[3])

    # Date of Inspection
    r_insp = t1.add_row()
    add_data_cell(r_insp, 0, "Date of Inspection:", width_in=1.8, bg_hex="F8FAFC")
    c_insp = add_data_cell(r_insp, 1, "09-11-2024 (Inspected by certified valuer in presence of owner)", width_in=5.17)
    c_insp.merge(r_insp.cells[2]).merge(r_insp.cells[3])

    doc.add_paragraph().paragraph_format.space_after = Pt(2)

    # Table 2: SURROUNDING LOCALITY DETAILS
    t2 = doc.add_table(rows=1, cols=4)
    t2.alignment = WD_TABLE_ALIGNMENT.CENTER
    t2.autofit = False
    row2 = t2.rows[0]
    add_header_cell(row2, 0, "SURROUNDING LOCALITY DETAILS", width_in=6.97, col_span=4, bg_hex="CBD5E1", font_size=10)
    row2.cells[0].merge(row2.cells[1]).merge(row2.cells[2]).merge(row2.cells[3])

    # Property Location Options
    r_loc = t2.add_row()
    add_data_cell(r_loc, 0, "Property Location:", width_in=1.8, bg_hex="F8FAFC")
    c_loc_val = add_data_cell(r_loc, 1, "", "[X] Within Municipal Limits     [ ] Outside Municipal Limits\n[ ] Gram Panchayat           [ ] Urban Development Authority", width_in=5.17)
    c_loc_val.merge(r_loc.cells[2]).merge(r_loc.cells[3])

    # Plot Demarcated at site
    r_dem = t2.add_row()
    add_data_cell(r_dem, 0, "Plot Demarcated at site:", width_in=1.8, bg_hex="F8FAFC")
    c_dem = add_data_cell(r_dem, 1, "", "[X] Yes, fully demarcated on all 4 boundaries by compound wall\n[ ] No, demarcated by stones/fencing", width_in=5.17)
    c_dem.merge(r_dem.cells[2]).merge(r_dem.cells[3])

    # Property Identification
    r_iden = t2.add_row()
    add_data_cell(r_iden, 0, "Property Identification:", width_in=1.8, bg_hex="F8FAFC")
    c_iden = add_data_cell(r_iden, 1, "", "[X] Easily Identifiable through building name & Flat No.\n[ ] Identified with help of local residents\n[ ] Identified by Plot demarcation", width_in=5.17)
    c_iden.merge(r_iden.cells[2]).merge(r_iden.cells[3])

    # Connectivity / Infrastructure
    r_conn = t2.add_row()
    add_data_cell(r_conn, 0, "Connectivity / Infrastructure:", width_in=1.8, bg_hex="F8FAFC")
    c_conn = add_data_cell(r_conn, 1, "", "[X] Excellent (Metalled bituminous road, street lights, piped water)\n[ ] Good     [ ] Average     [ ] Under Development", width_in=5.17)
    c_conn.merge(r_conn.cells[2]).merge(r_conn.cells[3])

    # Landmark Details Table (Railway, Bus Stop, Hospital, Airport)
    r_lm1 = t2.add_row()
    add_data_cell(r_lm1, 0, "Railway Station:", width_in=1.8, bg_hex="F8FAFC")
    add_data_cell(r_lm1, 1, "Patna Junction Railway Station ~ 3.5 Km", width_in=2.2)
    add_data_cell(r_lm1, 2, "Bus Stop / Stand:", width_in=1.4, bg_hex="F8FAFC")
    add_data_cell(r_lm1, 3, "Boring Road Crossing ~ 400 Meters", width_in=1.57)

    r_lm2 = t2.add_row()
    add_data_cell(r_lm2, 0, "Hospital / Healthcare:", width_in=1.8, bg_hex="F8FAFC")
    add_data_cell(r_lm2, 1, "Paras HMRI Hospital ~ 2.0 Km", width_in=2.2)
    add_data_cell(r_lm2, 2, "Airport / Terminal:", width_in=1.4, bg_hex="F8FAFC")
    add_data_cell(r_lm2, 3, "Jay Prakash Narayan Airport ~ 4.2 Km", width_in=1.57)

    p_f1 = doc.add_paragraph()
    p_f1.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_f1.paragraph_format.space_before = Pt(14)
    rf1 = p_f1.add_run("1 | Page")
    rf1.font.name = "Calibri"
    rf1.font.size = Pt(9)
    rf1.font.color.rgb = RGBColor(0x64, 0x74, 0x8B)

    # ----------------------------------------------------
    # PAGE 2: PROPERTY & STRUCTURAL DETAILS
    # ----------------------------------------------------
    doc.add_page_break()

    # Table 3: PROPERTY DETAILS
    t3 = doc.add_table(rows=1, cols=4)
    t3.alignment = WD_TABLE_ALIGNMENT.CENTER
    t3.autofit = False
    row3 = t3.rows[0]
    add_header_cell(row3, 0, "PROPERTY DETAILS", width_in=6.97, col_span=4, bg_hex="CBD5E1", font_size=10)
    row3.cells[0].merge(row3.cells[1]).merge(row3.cells[2]).merge(row3.cells[3])

    r_usg = t3.add_row()
    add_data_cell(r_usg, 0, "Usage of property:", width_in=1.8, bg_hex="F8FAFC")
    add_data_cell(r_usg, 1, "Residential (Used as private flat)", width_in=2.2)
    add_data_cell(r_usg, 2, "Legal Status:", width_in=1.4, bg_hex="F8FAFC")
    add_data_cell(r_usg, 3, "Freehold Clear Title", width_in=1.57)

    r_amen = t3.add_row()
    add_data_cell(r_amen, 0, "Civic Amenities:", width_in=1.8, bg_hex="F8FAFC")
    c_amen = add_data_cell(r_amen, 1, "Piped Drinking Water Supply, Underground Drainage, 3-Phase Electricity, Municipal Solid Waste Collection", width_in=5.17)
    c_amen.merge(r_amen.cells[2]).merge(r_amen.cells[3])

    doc.add_paragraph().paragraph_format.space_after = Pt(2)

    # Table 4: SUBJECT PROPERTY DETAILS
    t4 = doc.add_table(rows=1, cols=4)
    t4.alignment = WD_TABLE_ALIGNMENT.CENTER
    t4.autofit = False
    row4 = t4.rows[0]
    add_header_cell(row4, 0, "SUBJECT PROPERTY DETAILS", width_in=6.97, col_span=4, bg_hex="CBD5E1", font_size=10)
    row4.cells[0].merge(row4.cells[1]).merge(row4.cells[2]).merge(row4.cells[3])

    r_prt = t4.add_row()
    add_data_cell(r_prt, 0, "Premises Type:", width_in=1.8, bg_hex="F8FAFC")
    add_data_cell(r_prt, 1, "Multi-Storey Residential Apartment", width_in=2.2)
    add_data_cell(r_prt, 2, "Occupied By:", width_in=1.4, bg_hex="F8FAFC")
    add_data_cell(r_prt, 3, "Owner Self-Occupied", width_in=1.57)

    r_occ = t4.add_row()
    add_data_cell(r_occ, 0, "Occupant Name:", width_in=1.8, bg_hex="F8FAFC")
    add_data_cell(r_occ, 1, "Mr. Rajesh Kumar & Family", width_in=2.2)
    add_data_cell(r_occ, 2, "Relation with Applicant:", width_in=1.4, bg_hex="F8FAFC")
    add_data_cell(r_occ, 3, "Self / Co-Applicant", width_in=1.57)

    r_rent = t4.add_row()
    add_data_cell(r_rent, 0, "Is Property Rented:", width_in=1.8, bg_hex="F8FAFC")
    add_data_cell(r_rent, 1, "No (Self Occupied)", width_in=2.2)
    add_data_cell(r_rent, 2, "Renting Potential:", width_in=1.4, bg_hex="F8FAFC")
    add_data_cell(r_rent, 3, "[X] High    [ ] Medium    [ ] Low", width_in=1.57)

    r_maint = t4.add_row()
    add_data_cell(r_maint, 0, "Property Taxation / Maint.:", width_in=1.8, bg_hex="F8FAFC")
    add_data_cell(r_maint, 1, "Municipal Tax Paid up to 2026-27", width_in=2.2)
    add_data_cell(r_maint, 2, "Market Rentals/Sqft:", width_in=1.4, bg_hex="F8FAFC")
    add_data_cell(r_maint, 3, "Rs. 24 - 28 / Sq.ft / Month", width_in=1.57)

    doc.add_paragraph().paragraph_format.space_after = Pt(2)

    # Table 5: BOUNDARY DETAILS
    t5 = doc.add_table(rows=1, cols=3)
    t5.alignment = WD_TABLE_ALIGNMENT.CENTER
    t5.autofit = False
    row5 = t5.rows[0]
    add_header_cell(row5, 0, "BOUNDARY DETAILS", width_in=6.97, col_span=3, bg_hex="CBD5E1", font_size=10)
    row5.cells[0].merge(row5.cells[1]).merge(row5.cells[2])

    r_bd_hdr = t5.add_row()
    add_header_cell(r_bd_hdr, 0, "Direction", width_in=1.5, bg_hex="E2E8F0")
    add_header_cell(r_bd_hdr, 1, "As Per Documents / Title Deed", width_in=2.73, bg_hex="E2E8F0")
    add_header_cell(r_bd_hdr, 2, "Actual Physical Status At Site", width_in=2.74, bg_hex="E2E8F0")

    boundaries = [
        ("North", "Flat No. 301 & Common Lobby Corridor", "Flat No. 301 & Common Lobby Corridor (Matching)"),
        ("South", "Open to Sky / 20 Ft Internal Building Setback", "Open to Sky / 20 Ft Driveway Setback (Matching)"),
        ("East", "Boring Canal Road (Main 60 Feet Road)", "Boring Canal Road (Wide Bituminous Road) (Matching)"),
        ("West", "Compound Wall & Plot of Sri K. P. Singh", "Compound Wall & Residential House (Matching)"),
    ]
    for b_dir, b_doc, b_site in boundaries:
        r_b = t5.add_row()
        add_data_cell(r_b, 0, b_dir, "", width_in=1.5, bg_hex="F8FAFC", bold_label=True)
        add_data_cell(r_b, 1, "", b_doc, width_in=2.73)
        add_data_cell(r_b, 2, "", b_site, width_in=2.74)

    doc.add_paragraph().paragraph_format.space_after = Pt(2)

    # Table 6: STRUCTURAL DETAILS
    t6 = doc.add_table(rows=1, cols=4)
    t6.alignment = WD_TABLE_ALIGNMENT.CENTER
    t6.autofit = False
    row6 = t6.rows[0]
    add_header_cell(row6, 0, "STRUCTURAL DETAILS", width_in=6.97, col_span=4, bg_hex="CBD5E1", font_size=10)
    row6.cells[0].merge(row6.cells[1]).merge(row6.cells[2]).merge(row6.cells[3])

    r_st1 = t6.add_row()
    add_data_cell(r_st1, 0, "Type of Structure:", width_in=1.8, bg_hex="F8FAFC")
    add_data_cell(r_st1, 1, "RCC Framed Structure (Earthquake resistant)", width_in=2.2)
    add_data_cell(r_st1, 2, "No. of Floors:", width_in=1.4, bg_hex="F8FAFC")
    add_data_cell(r_st1, 3, "Basement + Ground + 5 Floors", width_in=1.57)

    r_st2 = t6.add_row()
    add_data_cell(r_st2, 0, "No. of Wings / Blocks:", width_in=1.8, bg_hex="F8FAFC")
    add_data_cell(r_st2, 1, "Single Integrated Block ('A' Wing)", width_in=2.2)
    add_data_cell(r_st2, 2, "Units per Floor:", width_in=1.4, bg_hex="F8FAFC")
    add_data_cell(r_st2, 3, "4 Residential Units per floor", width_in=1.57)

    r_st3 = t6.add_row()
    add_data_cell(r_st3, 0, "Internal Composition:", width_in=1.8, bg_hex="F8FAFC")
    c_comp = add_data_cell(r_st3, 1, "3 Bedrooms + 1 Drawing/Dining Room + 1 Kitchen + 2 Toilets/Bathrooms + 2 Balconies", width_in=5.17)
    c_comp.merge(r_st3.cells[2]).merge(r_st3.cells[3])

    p_f2 = doc.add_paragraph()
    p_f2.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_f2.paragraph_format.space_before = Pt(14)
    rf2 = p_f2.add_run("2 | Page")
    rf2.font.name = "Calibri"
    rf2.font.size = Pt(9)
    rf2.font.color.rgb = RGBColor(0x64, 0x74, 0x8B)

    # ----------------------------------------------------
    # PAGE 3: SPECIFICATIONS, PLAN APPROVALS & APARTMENT VALUATION
    # ----------------------------------------------------
    doc.add_page_break()

    # Table 7: AGE, MAINTENANCE & SPECIFICATIONS
    t7 = doc.add_table(rows=1, cols=4)
    t7.alignment = WD_TABLE_ALIGNMENT.CENTER
    t7.autofit = False
    row7 = t7.rows[0]
    add_header_cell(row7, 0, "AGE, MAINTENANCE & SPECIFICATIONS", width_in=6.97, col_span=4, bg_hex="CBD5E1", font_size=10)
    row7.cells[0].merge(row7.cells[1]).merge(row7.cells[2]).merge(row7.cells[3])

    r_age1 = t7.add_row()
    add_data_cell(r_age1, 0, "No. of Lifts:", width_in=1.8, bg_hex="F8FAFC")
    add_data_cell(r_age1, 1, "2 High-Speed Automatic Passenger Lifts", width_in=2.2)
    add_data_cell(r_age1, 2, "Age of Property:", width_in=1.4, bg_hex="F8FAFC")
    add_data_cell(r_age1, 3, "Approx. 4 Years", width_in=1.57)

    r_age2 = t7.add_row()
    add_data_cell(r_age2, 0, "Estimated Future Life:", width_in=1.8, bg_hex="F8FAFC")
    add_data_cell(r_age2, 1, "56 Years (Total design life 60 Years)", width_in=2.2)
    add_data_cell(r_age2, 2, "Exteriors Quality:", width_in=1.4, bg_hex="F8FAFC")
    add_data_cell(r_age2, 3, "Weather-proof exterior acrylic emulsion", width_in=1.57)

    r_age3 = t7.add_row()
    add_data_cell(r_age3, 0, "Quality of Construction:", width_in=1.8, bg_hex="F8FAFC")
    add_data_cell(r_age3, 1, "[X] Excellent    [ ] Good    [ ] Average", width_in=2.2)
    add_data_cell(r_age3, 2, "Appearance & Maint:", width_in=1.4, bg_hex="F8FAFC")
    add_data_cell(r_age3, 3, "Very Well Maintained Society", width_in=1.57)

    r_int = t7.add_row()
    add_data_cell(r_int, 0, "Interiors & Finishes:", width_in=1.8, bg_hex="F8FAFC")
    c_int = add_data_cell(r_int, 1, "Flooring: 800x800mm Vitrified Tiles; Toilets: Anti-skid ceramic tiles with premium Jaquar CP fittings; Doors: Teak wood frame with laminated flush doors; Windows: Powder coated UPVC sliding windows with mosquito mesh.", width_in=5.17)
    c_int.merge(r_int.cells[2]).merge(r_int.cells[3])

    doc.add_paragraph().paragraph_format.space_after = Pt(2)

    # Table 8: PLAN APPROVALS & STATUTORY COMPLIANCE
    t8 = doc.add_table(rows=1, cols=4)
    t8.alignment = WD_TABLE_ALIGNMENT.CENTER
    t8.autofit = False
    row8 = t8.rows[0]
    add_header_cell(row8, 0, "PLAN APPROVALS & STATUTORY COMPLIANCE", width_in=6.97, col_span=4, bg_hex="CBD5E1", font_size=10)
    row8.cells[0].merge(row8.cells[1]).merge(row8.cells[2]).merge(row8.cells[3])

    r_pl1 = t8.add_row()
    add_data_cell(r_pl1, 0, "Sanctioned Authority:", width_in=1.8, bg_hex="F8FAFC")
    add_data_cell(r_pl1, 1, "Patna Municipal Corporation (PMC)", width_in=2.2)
    add_data_cell(r_pl1, 2, "Approval Plan No:", width_in=1.4, bg_hex="F8FAFC")
    add_data_cell(r_pl1, 3, "PMC/BP/2020/782-A", width_in=1.57)

    r_pl2 = t8.add_row()
    add_data_cell(r_pl2, 0, "Construction as per plan:", width_in=1.8, bg_hex="F8FAFC")
    add_data_cell(r_pl2, 1, "[X] Yes, strictly conforms to approved map", width_in=2.2)
    add_data_cell(r_pl2, 2, "Deviations/Violations:", width_in=1.4, bg_hex="F8FAFC")
    add_data_cell(r_pl2, 3, "Nil / Within permissible limits", width_in=1.57)

    r_pl3 = t8.add_row()
    add_data_cell(r_pl3, 0, "Latitude & Longitude:", width_in=1.8, bg_hex="F8FAFC")
    c_geo = add_data_cell(r_pl3, 1, "Lat: 25.612845° N, Long: 85.123910° E (Geo-tagged at site during physical inspection)", width_in=5.17)
    c_geo.merge(r_pl3.cells[2]).merge(r_pl3.cells[3])

    doc.add_paragraph().paragraph_format.space_after = Pt(2)

    # Table 9: VALUATION FOR INDIVIDUAL APARTMENTS / FLATS
    t9 = doc.add_table(rows=1, cols=4)
    t9.alignment = WD_TABLE_ALIGNMENT.CENTER
    t9.autofit = False
    row9 = t9.rows[0]
    add_header_cell(row9, 0, "VALUATION FOR INDIVIDUAL APARTMENTS / FLATS", width_in=6.97, col_span=4, bg_hex="CBD5E1", font_size=10)
    row9.cells[0].merge(row9.cells[1]).merge(row9.cells[2]).merge(row9.cells[3])

    val_apt_data = [
        ("Carpet Area (RERA):", "1,240 Sq.ft", "Loading Factor (%):", "25 %"),
        ("Super Built-up Area (SBUA):", "1,550 Sq.ft", "Approved Plinth Area:", "1,380 Sq.ft"),
        ("Govt Guideline Rate (MVR):", "Rs. 6,800 / Sq.ft", "Prevailing Market Rate:", "Rs. 9,500 / Sq.ft"),
        ("Market Value of Flat (Gross):", "Rs. 1,47,25,000", "Forced Sale Discount (%):", "15 %"),
        ("Forced Sale / Distress Value:", "Rs. 1,25,16,250", "Final Recommended Rate:", "Rs. 9,500 / Sq.ft"),
    ]
    for l1, v1, l2, v2 in val_apt_data:
        r_v = t9.add_row()
        add_data_cell(r_v, 0, l1, "", width_in=1.8, bg_hex="F8FAFC", bold_label=True)
        add_data_cell(r_v, 1, "", v1, width_in=2.2)
        add_data_cell(r_v, 2, l2, "", width_in=1.4, bg_hex="F8FAFC", bold_label=True)
        add_data_cell(r_v, 3, "", v2, width_in=1.57)

    p_f3 = doc.add_paragraph()
    p_f3.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_f3.paragraph_format.space_before = Pt(14)
    rf3 = p_f3.add_run("3 | Page")
    rf3.font.name = "Calibri"
    rf3.font.size = Pt(9)
    rf3.font.color.rgb = RGBColor(0x64, 0x74, 0x8B)

    # ----------------------------------------------------
    # PAGE 4: LAND & BUILDING VALUATION, DECLARATION & SIGN-OFF
    # ----------------------------------------------------
    doc.add_page_break()

    # Table 10: LAND AND BUILDING COMPREHENSIVE VALUATION
    t10 = doc.add_table(rows=1, cols=4)
    t10.alignment = WD_TABLE_ALIGNMENT.CENTER
    t10.autofit = False
    row10 = t10.rows[0]
    add_header_cell(row10, 0, "LAND AND BUILDING COMPREHENSIVE VALUATION (BREAK-UP)", width_in=6.97, col_span=4, bg_hex="CBD5E1", font_size=10)
    row10.cells[0].merge(row10.cells[1]).merge(row10.cells[2]).merge(row10.cells[3])

    lb_data = [
        ("Land Area as per Sale Deed:", "3,600 Sq.ft (Undivided 450 Sq.ft UDS)", "Govt Guideline Rate (Land):", "Rs. 9,000 / Sq.ft"),
        ("Recommended Land Market Rate:", "Rs. 14,000 / Sq.ft", "Assessed Land / UDS Value:", "Rs. 63,00,000"),
        ("Actual Built-up Area (BUA):", "1,550 Sq.ft", "Replacement Cost of Construction:", "Rs. 2,400 / Sq.ft"),
        ("Gross Replacement Cost:", "Rs. 37,20,000", "Depreciation Rate (4 yrs @ 1.5%):", "6 % (Rs. 2,23,200)"),
        ("Depreciated Building Value:", "Rs. 34,96,800", "Amenities & Dedicated Car Parking:", "Rs. 8,00,000"),
        ("TOTAL VALUATION (Land + Bldg):", "Rs. 1,05,96,800", "Adopted Market Value (Rounded):", "Rs. 1,47,25,000"),
        ("Forced Sale Discount (%):", "15 %", "Forced Sale Value (In Figures):", "Rs. 1,25,16,000"),
    ]
    for l1, v1, l2, v2 in lb_data:
        r_lb = t10.add_row()
        add_data_cell(r_lb, 0, l1, "", width_in=1.8, bg_hex="F8FAFC", bold_label=True)
        add_data_cell(r_lb, 1, "", v1, width_in=2.2)
        add_data_cell(r_lb, 2, l2, "", width_in=1.4, bg_hex="F8FAFC", bold_label=True)
        add_data_cell(r_lb, 3, "", v2, width_in=1.57)

    # In Words Row
    r_words = t10.add_row()
    add_data_cell(r_words, 0, "Forced Sale Value in Words:", width_in=1.8, bg_hex="F8FAFC")
    c_words = add_data_cell(r_words, 1, "Rupees One Crore Twenty-Five Lakhs Sixteen Thousand Only", width_in=5.17)
    c_words.merge(r_words.cells[2]).merge(r_words.cells[3])

    r_mkt = t10.add_row()
    add_data_cell(r_mkt, 0, "Marketability & Liquidity:", width_in=1.8, bg_hex="F8FAFC")
    add_data_cell(r_mkt, 1, "[X] Good / Readily Marketable in open market", width_in=2.2)
    add_data_cell(r_mkt, 2, "Valuation Result:", width_in=1.4, bg_hex="F8FAFC")
    add_data_cell(r_mkt, 3, "Recommended for Mortgage", width_in=1.57)

    # Remarks
    r_rem = t10.add_row()
    add_data_cell(r_rem, 0, "REMARKS & RECOMMENDATIONS:", width_in=1.8, bg_hex="F8FAFC")
    c_rem = add_data_cell(r_rem, 1, "The subject property is located in an established, high-demand residential neighborhood of Patna with excellent civic infrastructure. Boundaries inspected at site match completely with title deed documents. The building is structurally sound with an estimated balance life of 56 years. The property is recommended as sound and adequate mortgage security for HDFC Bank Ltd.", width_in=5.17)
    c_rem.merge(r_rem.cells[2]).merge(r_rem.cells[3])

    doc.add_paragraph().paragraph_format.space_after = Pt(2)

    # Table 11: DECLARATION & VALUER SIGN-OFF
    t11 = doc.add_table(rows=1, cols=1)
    t11.alignment = WD_TABLE_ALIGNMENT.CENTER
    t11.autofit = False
    row11 = t11.rows[0]
    add_header_cell(row11, 0, "STATUTORY VALUER DECLARATION & CERTIFICATION", width_in=6.97, bg_hex="CBD5E1", font_size=10)

    r_decl = t11.add_row()
    c_decl = r_decl.cells[0]
    c_decl.width = Inches(6.97)
    set_cell_margins(c_decl, top=80, bottom=80, left=100, right=100)
    set_cell_borders(c_decl)
    p_dec = c_decl.paragraphs[0]
    p_dec.paragraph_format.line_spacing = 1.15
    p_dec.paragraph_format.space_after = Pt(4)
    decl_text = (
        "I / We hereby solemnly declare and certify that:\n"
        "(i) I/We have personally inspected the subject property at Flat No. 302, Shanti Vihar Apartment, Boring Canal Road, Patna on 09-11-2024 and physically verified all measurements against title deeds and sanctioned maps.\n"
        "(ii) I/We have no direct, indirect, present or contemplated future interest in the subject property or with the borrower / loan applicant.\n"
        "(iii) The valuation figures arrived at herein represent my independent, unbiased, objective professional opinion based on prevailing open market rates and thorough inquiries.\n"
        "(iv) The report strictly complies with the guidelines of IBBI (Valuation) Rules and the Empanelment Policy of HDFC Bank Ltd."
    )
    r_dt = p_dec.add_run(decl_text)
    r_dt.font.name = "Calibri"
    r_dt.font.size = Pt(8.5)
    r_dt.font.color.rgb = RGBColor(0x33, 0x41, 0x55)

    # Sign-off box
    r_sign = t11.add_row()
    c_sign = r_sign.cells[0]
    c_sign.width = Inches(6.97)
    set_cell_margins(c_sign, top=80, bottom=80, left=100, right=100)
    set_cell_borders(c_sign)
    p_sg = c_sign.paragraphs[0]
    p_sg.paragraph_format.line_spacing = 1.15
    
    # Valuer block
    r_s = p_sg.add_run(
        "Date of Declaration: 11-11-2024\n"
        "Place of Signing: Patna, Bihar\n\n\n"
        "____________________________________________\n"
        "Authorized Approved Valuer Signature & Seal\n"
        "Name: Arjun Mehta, B.E. (Civil), FIV\n"
        "IBBI Regn No: IBBI/RV/05/2019/11482\n"
        "HDFC Empanelment Code: HDFC-PAT-VAL-2024-089\n"
        "TrueArk Infrastructure Valuations Pvt. Ltd."
    )
    r_s.font.name = "Calibri"
    r_s.font.size = Pt(9)
    r_s.font.color.rgb = RGBColor(0x0F, 0x17, 0x2A)

    p_f4 = doc.add_paragraph()
    p_f4.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_f4.paragraph_format.space_before = Pt(14)
    rf4 = p_f4.add_run("4 | Page")
    rf4.font.name = "Calibri"
    rf4.font.size = Pt(9)
    rf4.font.color.rgb = RGBColor(0x64, 0x74, 0x8B)

    # ----------------------------------------------------
    # PAGE 5: DRAWINGS & SITE LAYOUT PLANS (EMPTY DRAWING SHEET)
    # ----------------------------------------------------
    doc.add_page_break()

    # Title Banner for Page 5
    t12 = doc.add_table(rows=1, cols=1)
    t12.alignment = WD_TABLE_ALIGNMENT.CENTER
    t12.autofit = False
    row12 = t12.rows[0]
    add_header_cell(row12, 0, "DRAWINGS & SITE LAYOUT PLANS", width_in=6.97, bg_hex="CBD5E1", font_size=11, align=WD_ALIGN_PARAGRAPH.CENTER)

    # Subtitle instruction
    p_sub = doc.add_paragraph()
    p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_sub.paragraph_format.space_before = Pt(4)
    p_sub.paragraph_format.space_after = Pt(12)
    r_sub = p_sub.add_run("(Space reserved for attaching architectural drawings, approved floor plans, structural layouts and site sketches)")
    r_sub.font.name = "Calibri"
    r_sub.font.size = Pt(9)
    r_sub.italic = True
    r_sub.font.color.rgb = RGBColor(0x64, 0x74, 0x8B)

    # Large Empty Box for Drawing Attachment (height ~ 8.2 inches)
    t_draw = doc.add_table(rows=1, cols=1)
    t_draw.alignment = WD_TABLE_ALIGNMENT.CENTER
    t_draw.autofit = False
    c_dr = t_draw.rows[0].cells[0]
    c_dr.width = Inches(6.97)
    set_cell_margins(c_dr, top=2000, bottom=2000, left=200, right=200)
    # Dotted or solid thin border
    set_cell_borders(c_dr, top="94A3B8", bottom="94A3B8", left="94A3B8", right="94A3B8", sz="6")
    set_cell_shading(c_dr, "F8FAFC")

    p_dr = c_dr.paragraphs[0]
    p_dr.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_dr1 = p_dr.add_run("[ ATTACH ARCHITECTURAL DRAWINGS & APPROVED FLOOR PLANS HERE ]\n\n\n\n\n\n\n\n")
    r_dr1.font.name = "Calibri"
    r_dr1.font.size = Pt(11)
    r_dr1.bold = True
    r_dr1.font.color.rgb = RGBColor(0x64, 0x74, 0x8B)

    r_dr2 = p_dr.add_run("Certified drawings, key plan, floor layout, and structural elevations to be inserted by the company")
    r_dr2.font.name = "Calibri"
    r_dr2.font.size = Pt(9)
    r_dr2.italic = True
    r_dr2.font.color.rgb = RGBColor(0x94, 0xA3, 0xB8)

    p_f5 = doc.add_paragraph()
    p_f5.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_f5.paragraph_format.space_before = Pt(20)
    rf5 = p_f5.add_run("5 | Page")
    rf5.font.name = "Calibri"
    rf5.font.size = Pt(9)
    rf5.font.color.rgb = RGBColor(0x64, 0x74, 0x8B)

    # Save to disk
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    doc.save(output_path)
    print(f"Successfully generated HDFC format Word document at: {output_path}")

if __name__ == "__main__":
    out_file = os.path.abspath(r"frontend\public\HDFC_Format.docx")
    build_hdfc_document(out_file)
